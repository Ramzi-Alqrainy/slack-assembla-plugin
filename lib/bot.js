var _ = require('underscore');
var slack = require('./slacker');
var slackbot = require('node-slackbot');
/**
 * Slackbot to integrate Assembla.
 *
 * The main thing it does right now is auto-expand links, but since we are bringing in the Assembla plugin, there is more it can do
 *
 * See config-example.js for configuration
 *
 * To run:  node config-XXX.js   (where XXX is the name of your config
 *
 * See:
 * https://www.npmjs.com/package/node-slackbot
 * 
 */
var Bot = function (config) {
  var self = this;
  this.config = _.defaults(config, {
    bot_name: "AssemblaBot",
    emoji: ":warning:",
    link_separator: ", ",
    post: true
  });

  this.slacker = new slack.Slacker({ token: this.config.token });
  return this;
};

Bot.prototype.run = function () {
  var self = this;
  var verbose = self.config.verbose;
  var bot = new slackbot(this.config.token);
  var pattern = "(?:\\W|^)((";
  _.each(self.config.projects, function (prj, index, list) {
    pattern += prj;
    if (index != list.length - 1) {
      pattern += "|";
    }
  });
  pattern += ")\\d+)(?:(?=\\W)|$)";
  if (verbose){
    console.log("Pattern is: " + pattern);
  }

  bot.use(function (message, cb) {
    if ('message' == message.type && message.text != null && message.subtype != "bot_message") {
      if (verbose) {
        console.log(message);
      }
      var text = message.text;
      var links = "";
      var regexp = new RegExp(pattern, "g");
      var match = regexp.exec(message.text);
      console.log("M: " + match);
      var changed = match != null;
      while (match != null) {
        var assembla = match[1].trim(); // PROJECTXXXX is the first capturing group, e.g. ((PROJECT)-\d+)
        var prjName = match[2];     // PROJECT is the second capturing group
        var url;
        var configUrl = "";
        if (self.config.assembla_urls[prjName]) {
          configUrl = self.config.assembla_urls[prjName];
        } else {
          configUrl = self.config.assembla_urls["DEFAULT"];
        }
        url = configUrl + assembla;
        if (links.length > 0) {
          links += self.config.link_separator;
        }
        links += url;
        match = regexp.exec(message.text);
      }
      if (changed) {
        text += "\n\t>>> Assembla: " + links;
        if (verbose) {//TODO: replace w/ better logging
          console.log(message.user + ' said: ' + message.text + " and replaced: " + text);
        }

        if (self.config.post == true) {
          self.slacker.send('chat.postMessage', {
            channel: message.channel,
            parse: "full",
            text: "\t" + links,
            username: self.config.bot_name,
            unfurl_links: false,
            link_names: 1,
            icon_emoji: self.config.emoji
          });
        } else {
          self.slacker.send('chat.update', {
            channel: message.channel,
            parse: "full",
            text: text,
            ts: message.ts
          });
        }
      }
    }
    cb();
  });
  bot.connect();
};


exports = module.exports.Bot = Bot;
