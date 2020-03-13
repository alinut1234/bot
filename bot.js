const Discord = require("discord.js");
const bot = new Discord.Client();
const prefix = "/";
var fs = require("fs");
var lineReader = require("line-reader");
var async = require("async");
const firstline = require("firstline");
const generated = new Set();
var os = require("os");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({ status: 'online', game: { name: `${bot.guilds.size} Servers`, type: "WATCHING"}});

});

bot.on("message", message => {
        if (message.author.bot) return;
        var command = message.content
            .toLowerCase()
            .slice(prefix.length)
            .split(" ")[0];

        if (command === "invite") {
            message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=680734361288441986&permissions=8&scope=bot");
        }

        if (command === "gen") {
            message.author.sendMessage("https://discord.gg/eCyGvRm")
        }

        if (command === "gen") {
            if (message.channel.type == "dm") return;
            if (generated.has(message.author.id)) {
                message.channel.send(
                    "Wait one minute before generating another account!. - " +
                    message.author
                );
            } else {
                let messageArray = message.content.split(" ");
                let args = messageArray.slice(1);
                if (!args[0])
                    return message.reply("Please, specify the service you want!");
                var fs = require("fs");
                const filePath = __dirname + "/" + args[0] + ".txt";

                fs.readFile(filePath, function (err, data) {
                    if (!err) {
                        data = data.toString();
                        var position = data.toString().indexOf("\n");
                        var firstLine = data.split("\n")[0];
                        message.author.send(firstLine);
                        if (position != -1) {
                            data = data.substr(position + 1);
                            fs.writeFile(filePath, data, function (err) {
                                const embed = {
                                    title: "Account Generated!",
                                    description: "Check your dm for the account's information!",
                                    color: 8519796,
                                    timestamp: "2019-04-04T14:16:26.398Z",
                                    footer: {
                                        icon_url:
                                            "https://cdn.discordapp.com/avatars/530778425540083723/7a05e4dd16825d47b6cdfb02b92d26a5.png",
                                        text: "Buy discord accounts from PineApple#6666"
                                    },
                                    thumbnail: {
                                        url:
                                            "https://gifimage.net/wp-content/uploads/2018/06/tick-gif.gif"
                                    },
                                    author: {
                                        name: "Account Generator",
                                        url: "https://discordapp.com",
                                        icon_url: bot.displayAvatarURL
                                    },
                                    fields: []
                                };
                                message.channel.send({ embed });
                                generated.add(message.author.id);
                                setTimeout(() => {
                                    // Removes the user from the set after a minute
                                    generated.delete(message.author.id);
                                }, 60000);
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } else {
                            message.channel.send(
                                "Sorry, there isn't any account available for that service!"
                            );
                        }
                    } else {
                        message.channel.send(
                            "Sorry, that service doesn't exists on our database"
                        );
                    }
                });
            }
        }
        else
        if (command === "stock") {
            message.channel.send({embed: {
                color: 3447003,
                title: "STOCK:",
                fields: [
                  { name: "THE STOCK ARE:", value: "\n**SPOTIFY**\n**HULU**\n**WISH**\n**PANDORA**\n**NORDVPN**\n**NETFLIX**\n**HBO**\n**DISNEY+**\n**ROBLOX**\n**FORTNITE**\n**STEAM**\n**MINECRAFT**\n**MAILACCESS**\n**ORIGIN**\n**INSTAGRAM**\n**NITRO**\n**AMAZON**\n**AMAZON_CODE**\n**XBOX_CODE**\n**STEAM_CODE**\n**PLAYSTORE_CODE**\n**GEFORCE_CODE**\n**CRUNCHYROLL**\n**LEAGUE_OF_LEGENDS_CODE**", inline: true},
                ]
              }
            });                
        }
        if (command === "help") {
            message.channel.send({embed: {
                color: 3447003,
                title: "HELP:",
                fields: [
                  { name: "THE COMMANDS ARE:", value: "\n**STOCK** - view the bot stock\n**INVITE** - invite the bot to ur server\n**GEN** - generate a account\n**HELP** - this", inline: true},
                ]
              }
            });                
        }
        if (command === "fsfdd") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            var account = args[0]
            var service = args[1]
            const filePath = __dirname + "/" + args[1] + ".txt";
            fs.appendFile(filePath, os.EOL + args[0], function (err) {
                if (err) return console.log(err);
                message.channel.send("Done!")
            });


        }
        if (command === "sdfsdf") {
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            var fs = require("fs");
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            const filePath = __dirname + "/" + args[0] + ".txt";
            fs.writeFile(filePath, 'first:first', function (err) {
                if (err) throw err;
                message.channel.send("Done!")
            });
        }
        if (command === "restock") {
            let messageArray = message.content.split(" ");
            let args = messageArray.slice(1);
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you can't do it, you are not an admin!");
            if (!args[0])
                return message.reply(
                    "Please, specify the service you want to restock!"
                );
            message.channel.send(
                "@everyone " +
                "**" +
                args[0] +
                "**" +
                " has been restocked by " +
                "<@" +
                message.author.id +
                ">"
            );
        }
    }
);

client.login(Njg3NzIyMjc0NDQyNDQ0ODIw.XmulbA.v6Y4AeqIy1ibeVPhyzc7Q2Q6rPs);
