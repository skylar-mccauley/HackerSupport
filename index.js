const fs = require("fs");
fs.readFile(`./data/brain/startup.txt`, 'utf8', function(err, data) {
  console.log(data)
})

const moment = require('moment')
const Discord = require("discord.js");
const RichEmbed = require("discord.js").RichEmbed;
const client = new Discord.Client({
  autoReconnect:true,
  messageCacheMaxSize: 10,
  messageCacheLifetime: 30,
  messageSweepInterval: 35
});
const config = require("./data/config.json");
const token = config.token
var db = require("./data/db.json")

/* client.on("message", (message) => { 	
	if(message.guild.id == db.servers.id.cleverbot) {
    
  const messageRole = message.guild.roles.find(role => role.name === "CleverMember")
  const messageRoleExists = message.guild.roles.exists(role => role.name === "CleverMember")

  
    if(message.member.roles.has(messageRole.id)) return;

    message.member.addRole(messageRole)
  
  }
  if(message.guild.id == db.servers.id.hackerworld) {
    	const messageRole = message.guild.roles.find(role => role.name === "Hackers")
    const messageRoleExists = message.guild.roles.exists(role => role.name === "Hackers")

    if(message.member.roles.has(messageRole.id)) return;

    message.member.addRole(messageRole)
  
  }
  if(message.content.toUppercase.includes("ALEXA PLAY DESPACITO") || message.content.toUppercase.includes("ALEXA, PLAY DESPACITO")) {
    message.channel.send(`Playing Despacito by Luis Fonsi ft. Daddy Yankee`)
  }
}); */


/*client.on("message", (message) => {
  message.guild.member.forEach( (member,id) => {
    member.setNickname('messageRoleBITCONNEEEEEEEEEEEECT')
    console.log('BitConnect-ified')
  })
}) */
client.on('error', (error) => {
console.log('A WebSocket error has occured: ' + error)
});

client.on("message", (message) => {

		const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
        const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : config.testString;


        const args = message.content.split(" ");

        if (message.author.bot) return;
        if (message.author == client.user) return;

        var cmd = message.content
        var guild = message.guild
        
        function help() {
        var helpembed = new Discord.RichEmbed()
   			 .setTitle('HackerSupport Commands')
    		 .setDescription('**help** - `Get documentation on available commands`\n' +
                    '**ping** - `Ping ' + client.user.username + '`\n' + 
                    '**info** - `Info on ' + client.user.username + '`\n' +
                    '**bugreport** - `Report a bug`\n' +
                    '**suggestion** - `Make a suggestion`\n' +
                     '**rules** - `View or set the rules`')

		message.channel.send({embed: helpembed})
        	
        }
        if(cmd.startsWith(`${prefix} verify`)) {

          if(message.guild.id == db.servers.id.cleverbot) {
    
            const messageRole = message.guild.roles.find(role => role.name === "CleverMember")
          
            
              if(message.member.roles.has(messageRole.id)) return;
          
              message.member.addRole(messageRole)
            
            }
            if(message.guild.id == db.servers.id.hackerworld) {
                const messageRole = message.guild.roles.find(role => role.name === "Hackers")
          
              if(message.member.roles.has(messageRole.id)) return;
          
              message.member.addRole(messageRole)
            }
            if(message.guild.id == db.servers.id.fishbate) {
              const messageRole = message.guild.roles.find(role => role.name === "Verified Buffoon")

              if(message.member.roles.has(messageRole.id)) return;

              message.member.addRole(messageRole)
            }

          return;
        }
        if(cmd.startsWith(`${prefix} announce`)) {
          
          if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You are not authorized to use this command");
    
    if(!args[2]) return;

    var channelID = args[2]
        var Channel = client.channels.find(channel => channel.id === channelID)

        if(channelID.length < 1) {
            Channel = client.channels.find(channel => channel.id === message.channel.id)
        }
        
        if (channelID.startsWith('<#') && channelID.endsWith('>')) {
            Channel = client.channels.find(channel => channel.id === channelID.substr(2).slice(0, -1))
        }
   
        var announcementMsg = new Discord.RichEmbed()
            .setColor(config.color)
            .setTitle(`Announcement from ${message.author.tag}`)
            .setDescription(message.content.split(/\s+/g).slice(3).join(" "))
            .setFooter(`${moment().format('MMMM Do YYYY, h:mm:ss a')}`)

    Channel.send({embed: announcementMsg}).then( () => {
        message.delete().then( () => {
            message.channel.send("Announcement sent :white_check_mark:").then( () => {
                setTimeout( () => {
                    message.delete()
                }, 1000)
            })
        })
        
    })
          return;
        }
        if(cmd.startsWith(`${prefix} info`)) {
        	var info = new Discord.RichEmbed()
		    .setTitle(client.user.username)
		    .addField('Owner', '`' + client.users.get('270375857384587264').tag + '`', true)
		    .addField('Library', '[Discord.JS](https://discord.js.org/)', true )
		    .addField('Language', '[NodeJS](https://nodejs.org/)', true)
		    .setThumbnail(client.user.displayAvatarURL)
		    // removed 

    	message.channel.send({embed: info})

        	return;
        }
        if(cmd.startsWith(`${prefix} ping`)) {
        	var pingstart = new Discord.RichEmbed()
		        .setColor(config.embedcolor)
		        .setDescription('Pinging...')
		        .setAuthor(message.author.username, message.author.displayAvatarURL)
		    message.channel.send({embed: pingstart}).then(sent => {
        	var pinged = new Discord.RichEmbed()
	          .setColor(config.embedcolor)
	          .setTitle('**Pong!**')
	          .setDescription(`${sent.createdTimestamp - message.createdTimestamp}ms`)
        sent.edit({embed: pinged})
      })
        	return;
        }
        if(cmd.startsWith(`${prefix} restart`)) {
        	if(message.author.id !== "270375857384587264") return;
		    process.exit(0)
		    return;
        }
        if(cmd.startsWith(`${prefix} rules`)) {

        var r = message.content.split(' ').slice(1).join(' ')    
        var rulesToSet = r.split("-set");
  
        if(r[1].length < 1 || !r[1] || !rulesToSet[0] || !rulesToSet[1]) {

        var fileToRead = null
        if(message.guild.id == db.servers.id.hackerworld) {
          fileToRead = db.filePath.rules.hackerworld
        }
        if(message.guild.id == db.servers.id.cleverbot) {
          fileToRead = db.filePath.rules.cleverbot
        }
        if(message.guild.id == db.servers.id.fishbate) {
          fileToRead = db.filePath.rules.fishbate
        }
        if(!fs.existsSync(`${fileToRead}`)) return message.channel.send("No rules have been set for this server.")

        try {
        fs.readFile(`${fileToRead}`, 'utf8', function(err, data) {
          if (err) {
            return console.log(err)
        }
                var r = new Discord.RichEmbed()
                .setColor(config.embedcolor)
                .setTitle(message.guild.name + " Rules")
                .setDescription(data)
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setFooter("To set rules, use @HackerSupport rules -set No naughty stuff")

                message.channel.send({embed: r})
        })
      } catch (ex) {
        message.channel.send(`An unexpected error has occurred: ${ex}`)
        return;
      }
        
      }
     
    if(args[2] === '-set') {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('MANAGE_GUILD permission required').catch(console.error);

        if(!rulesToSet) return message.channel.send("To set rules, use `@HackerSupport rules -set No naughty stuff`");


        var newRules = rulesToSet[1]
        
        var fileToWrite = null
          if(message.guild.id == db.servers.id.hackerworld) {
            fileToWrite = db.filePath.rules.hackerworld
          }
          if(message.guild.id == db.servers.id.cleverbot) {
            fileToWrite = db.filePath.rules.cleverbot
          }
          if(message.guild.id == db.servers.id.fishbate) {
            fileToWrite = db.filePath.rules.fishbate
          }
          try {
            fs.writeFile(fileToWrite, newRules, function(err) {
		            
              if(err) return console.log(err);
              
              }); 
          } catch (ex) {
            message.channel.send(`An unexpected error has occurred: ${ex}`)
            return;
          }
           

        }
        	return;
        }
        if(cmd.startsWith(`${prefix} suggestion`)) {

          if(message.guild.id !== db.servers.id.hackerworld && message.guild !== db.servers.id.cleverbot) return message.channel.send("This server is not authorized to use this command.")

        	var sug = message.content.split(' ').slice(1).join(' ')
    const suggestChannel = message.guild.channels.find(channel => channel.name === "suggestions")
          sug = sug.slice(10);
    if(sug.length < 1) {
        var nosug = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Suggestion Submitter')
            .setDescription('Please provide a decent suggestion! **Any abuse of this system will result in command restrictions or ban**\n' +
                            '**Example**\n' +
                            '`suggestion CleverBot won\'t tell me it loves meeee!`\n')
           return message.channel.send({embed: nosug});
    } else if (sug.length < 15) {
        var suggestionShort = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Suggestion Content Insufficient')
            .setDescription('Please provide more information about this suggestion. It will help greatly in bringing it to fruition.')
            .setAuthor(message.author.tag, message.displayAvatarURL)
            return message.channel.send({embed: suggestionShort})
    } else {
        var receivedSug = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Suggestion Recieved')
            .setDescription('Your suggestion can be found in '+ message.guild.channels.find(channel => channel.name === "suggestions"))
        var noSuggestChannel = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('No Suggestion Channel Found!!!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        var suggestion = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Suggestion by ' + message.author.tag)
            .setDescription('```' + sug + '```')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        if(suggestChannel) {
            suggestChannel.send({embed: suggestion})
            message.channel.send({embed: receivedSug})
            
        } else {
            message.channel.send({embed: noSuggestChannel}).then(message => {
                message.channel.send({embed: suggestion})
            })
        }
    }
        	return;
        }
    if(cmd.startsWith(`${prefix} bugreport`)) {
      if(message.guild.id !== db.servers.id.hackerworld && message.guild !== db.servers.id.cleverbot) return message.channel.send("This server is not authorized to use this command.")
    	var bug = message.content.split(' ').slice(1).join(' ')
    const bugReportChannel = message.guild.channels.find(channel => channel.name === "bug-reports")
    bug = bug.slice(9);
    if(bug.length < 1) {
        var nobug = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Bug Report')
            .setDescription('Please provide a detailed bug report! **Any abuse of this system will result in command restrictions or ban**\n' +
                            ':white_check_mark: - What\'s the problem?\n' +
                            ':white_check_mark: - What is the intended result?\n' +
                            ':white_check_mark: - What service is producing this bug? (ie; Sunset, HackerHub Website)\n' +
                            ':white_check_mark: - Any other info?')
           return message.channel.send({embed: nobug});
    } else if (bug.length < 25) {
        var bugReportShort = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Bug Report Insufficient')
            .setDescription('Please provide more information about this bug. It will help greatly in fixing it.')
            .setAuthor(message.author.tag, message.displayAvatarURL)
            return message.channel.send({embed: bugReportShort})
    } else {
        var receivedBug = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Bug Report Recieved!')
            .setDescription('Your bug report can be found in ' + message.guild.channels.find('name', 'bug-reports'))
        var noBugReportChannel = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('No Bug Report Found!!!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        var bugReport = new Discord.RichEmbed()
            .setColor(config.embedcolor)
            .setTitle('Bug Report by ' + message.author.tag)
            .setDescription('```' + bug + '```')
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
        if(bugReportChannel) {
            bugReportChannel.send({embed: bugReport})
            message.channel.send({embed: receivedBug})
            
        } else {
            message.channel.send({embed: noBugReportChannel}).then(message => {
                message.channel.send({embed: bugReport})
            })
        }
    }
    	return;
    }
    if(cmd.startsWith(`${prefix}`)) return help()
        
})

  client.on("ready", () => {
    
    
    console.log('[Logged in] ' + client.user.tag)
    console.log('[Time] ' + moment().format('MMMM Do YYYY, h:mm:ss a'))

});

client.on("ready", () => {
  function setAct() {
    client.user.setActivity('everyone', { type: 'LISTENING' })
  }
  setInterval(setAct, 300000)

})

client.on('disconnect', event => {
    console.log('[DISCONNECTED] Attempting to reconnect')
    client.login(token)
  })

  

    client.login(token)
