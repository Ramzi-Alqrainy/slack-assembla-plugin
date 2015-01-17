# hubot-assembla

Interact with the Assembla API

## Installation

In hubot project repo, run:

`npm install hubot-assembla --save`

Then add **hubot-assembla** to your `external-scripts.json`:

```json
["hubot-assembla"]
```

## Config

    HUBOT_ASSEMBLA_API_APP_ID - Create @ https://www.assembla.com/user/edit/manage_clients (leave website and redirect URLs blank)
    HUBOT_ASSEMBLA_API_APP_SECRET
    HUBOT_ASSEMBLA_SPACE - Assembla workspace that the script will interact with
    HUBOT_ASSEMBLA_DEPLOY_ACTION_ID - SSH action id for your default deploy

## Commands

    hubot deploy - deploy the default project
    hubot deploy #<merge_req_number> - merge and close an MR then perform deploy via ssh_tool
    hubot sshtool actions - list actions in the ssh tool
    hubot sshtool action <ssh_tool_action_id_or_name> - look up a sshtool action by id or name
    hubot sshtool run <ssh_tool_action_id_or_name> - run a sshtool action by id or name
    hubot assembla pin <pin_code> - authenticate with a pin code
    hubot forget my assembla auth - forget api token
    hubot assembla whoami - who are you on assembla
    hubot mr #<merge request> - show merge request
    hubot merge request #<merge request> - show merge request
    hubot merge_and_close merge request #<merge request> - merge and close merge request
    hubot ignore merge request #<merge request> - ignore merge request
    hubot create ticket <summary> - Creates a ticket on default space
    hubot create ticket <summary> #in <space> - create a ticket on the space given
    hubot assembla user <username_or_id> - display user
    hubot space <space> - look up a space by id or wiki_name
    ticket #<ticket> - show ticket on default space
