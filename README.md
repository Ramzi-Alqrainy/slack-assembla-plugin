# Slack Assembla Plugin

Assembla integration with [slack](http://slack.com).  

This plugin is recommended by [Slack Community Team](https://api.slack.com/community)

It does the following:

1. Automatically append a link to a message whenever there is a mention of a Assembla issue in the message

## Usage

```javascript
git clone https://github.com/Ramzi-Alqrainy/slack-assembla-plugin.git
cd slack-assembla-plugin
npm install
```

Write your own configuration file (`config-example.js`) is a good starting point for building your own.

```javascript
var slackbot = require('./lib/bot');

var config = {
    bot_name: "",//Provide the name to post under
    token: 'XXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXXX-XXXXXX', //get from https://api.slack.com/web#basics
    assembla_urls: {
      "#": "https://www.assembla.com/spaces/[PROJECT]/tickets/",
      "DEFAULT": "https://www.assembla.com/spaces/[PROJECT]/tickets/"
    },
    projects: ["#"],  // Replace these w/ a comma separated list of your project URLs.
    post: true, //If true, than post a new message instead of updating the current message
    verbose: true,
    emoji: ":warning:",
    link_separator: ", "// use \n if you want new lines
};

//DO NOT EDIT BELOW HERE
var slackbot = new slackbot.Bot(config);
slackbot.run();
```

Save this to a file in the root of the project then run your bot with:

    node your-config-file, eg.: node config-ramzi

This will launch the bot in your terminal based on provided configuration.

## Configuration

- `token`: Your Slack API token, get your token at https://api.slack.com/
- `assembla_urls`: A mapping of Assembla project names to the URL that can display that Assembla issue, i.e. # -> https://www.assembla.com/spaces/[PROJECT]/tickets/
- `projects`: A list of Assembla project names, as in SOLR, MAHOUT, LUCENE
- `post`: If true, then post a new msg, else update the current one
- `verbose`: print logging info
- `emoji`: The emoji to use for the bot.  You may need to create a Assembla emoji for the current one to work, else replace w/ your favorite slack emoji
- `link_separator`: The text to use to separate links in the response.

## TODO:

- Deeper integration w/ the Assembla API
- Optionally restrict to certain config'd channels
