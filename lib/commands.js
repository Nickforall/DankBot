var client;
const scopeObject = {
    client: client
};

module.exports = function(client) {
    client = client;

    client.on('_cmd', (cmd, args, message) => {
        if(commands[cmd] !== undefined) {
            try {
                if(!commands[cmd].preserve) {
                    if(message.channel.type == "text") message.delete();                    
                }

                commands[cmd].execute.call(scopeObject, args, message, client);            
            } catch (error) {
                console.error(error);
                message.reply("Something went wrong, the command existed however");
            }
        } else {
            message.reply("You fucked up, this command does not exist. Are you retarded MAN.");            
        }
    });

    return {};
}

const commands = {
    "age": {
        "description": "Gets the age of the current server",
        "execute": function(args, message) {
            var date = message.guild.createdAt;
            var now = new Date();

            var seconds = Math.floor((now - (date))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days = Math.floor(hours/24);
            var years = Math.floor(days/365);

            days = days;
            hours = hours-(days*24);
            minutes = minutes-(days*24*60)-(hours*60);
            seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

            days = days-(years*365);

            message.reply(years + " years, " + days + " days, " + hours + " hours, "
                + minutes + " minutes and " + seconds
                + " seconds since this server was created. (" + date.toUTCString() + ")");
        }
    },
    "eval": {
        "description": "Anna bob eval",
        "execute": function(args, message, client) {
            const userIds = ["132638759215824897"];
            if(!(userIds.indexOf(message.author.id) > -1)) {
                message.reply("You can request access to eval Nick if you really want to");
                return;
            }

            var evalcode = args.join(" ");

            try {
                eval(evalcode);
            } catch(ex) {
                message.author.send("You fucked up yo: `" + ex.message + "`");
            }

            if(message.channel.type == "text") message.delete();
        }
    },
    "stan": {
        "description": "When stan goes cray",
        "preserve": true,
        "execute": function(args, message, client) {
            const gifs = [
                "https://media.giphy.com/media/l378AEZceMwWboAQE/giphy.gif",
                "https://media.giphy.com/media/l4HohVwFLzHKcwa6A/giphy.gif",
                "https://media.giphy.com/media/LiRoVoHjMa5bO/giphy.gif",
                "https://media.giphy.com/media/l2JhpjWPccQhsAMfu/giphy.gif",
                "https://media.giphy.com/media/p8Uw3hzdAE2dO/giphy.gif",
                "https://media.giphy.com/media/wofftnAdDtx4s/giphy.gif",
                "https://media.giphy.com/media/3owypkSIpM8xw6p7W0/giphy.gif",
                "https://media.giphy.com/media/3ov9jIoFd00talgv72/giphy.gif",
                "https://media.giphy.com/media/YPgEMyIKuSlpK/giphy.gif"
            ];

            message.channel.send(gifs[Math.floor(Math.random() * gifs.length)]);
        }
    },
    "sauce": {
        "description": "Because we can",
        "preserve": true,
        "execute": function(args, message, client) {
            message.reply("https://github.com/Nickforall/DankBot");
        }
    },
    "": {
        "description": "Because we can",
        "preserve": true,
        "execute": function(args, message, client) {
            message.reply("https://github.com/Nickforall/DankBot");
        }
    },
}