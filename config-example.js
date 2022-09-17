var slackbot = require('./lib/bot');

var config = {
    bot_name: "Assembla",//Provide the name to post under
    token: 'XXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXX',
    assembla_urls: {
      "#": "https://www.assembla.com/spaces/[PROJECT]/tickets/",
      "DEFAULT": "https://www.assembla.com/spaces/[PROJECT]/tickets/"
    },
    projects: ["#"],
    post: true, //If true, than post a new message instead of updating the current.
    verbose: true,
    emoji: ":warning:",
    link_separator: ", "// use \n if you want new lines
};

//DO NOT EDIT BELOW HERE
var slackbot = new slackbot.Bot(config);
slackbot.run();
