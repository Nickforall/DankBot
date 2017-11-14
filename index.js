// load ze config
require('dotenv').config();

// load libraries
const Discord = require("discord.js");
const client = new Discord.Client();
const commands = require("./lib/commands")(client);

// globals
global.COMMAND_PREFIX = "db!";
global.DICKBUDDS_VOICE_ID = "311201456655040515"

// ready handler
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame('Dickbudds');
});

// message handler
client.on('message', message => {
    if(message.content.startsWith(COMMAND_PREFIX)) {
        var argArray = message.content.split(" ");
        
        var cmd = argArray[0].substr(3);
        
        argArray.shift();
        client.emit("_cmd", cmd, argArray, message); 
    }
});

// logs in
client.login(process.env.DISCORD_TOKEN);