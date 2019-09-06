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
client.on("message", (message) => {
  // Message Filter
  fs.readFile("./data/bannedTerms.json", 'utf8', function(err, termData) {
    if(err) return message.channel.send(strings.error_occured + err)
    termData = JSON.parse(termData)
    if(termData.includes(message.content)) {
      message.delete(0).then( () => {
        message.channel.send("That URL is banned, " + message.author.toString())
      })
      
      return;
    }
    if(message.content.includes(termData)) {
      message.delete(0).then( () => {
        message.channel.send("That URL is banned, " + message.author.toString())
      })
      
      return;
    }
    return;
  });
return;
}); 
client.on("message", (message) => {

	if(message.guild.id == db.servers.id.cleverbot) {
		 	if(message.author.id == client.user.id) return;
		 	
		 	id = message.id
		    content = message.content
		    var timestamp = Date.now()
		
		    var channel = client.channels.find("id", "569610916782669844")
		    var embed = new Discord.RichEmbed()
		      .setTitle("Message Log")
		      .setDescription(content)
		      .addField("Message ID", id)
		      .addField("Author ID", message.author.id)
		      .addField("Author Tag", message.author.tag)
		      .addField("Channel ID", message.channel.id)
		      .addField("Channel Name", message.channel.name)
		      .setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
		      .setFooter(moment().format('MMMM Do YYYY, h:mm:ss a'))
		      channel.send(embed)
    }
    if(message.guild.id == db.servers.id.hackerworld) {
    		if(message.author.id == client.user.id) return;
		    
		    id = message.id
		    content = message.content
		    var timestamp = Date.now()
			
		    var channel = client.channels.find("id", "569609651017089035")
		    var embed = new Discord.RichEmbed()
		      .setTitle("Message Log")
		      .setDescription(content)
		      .addField("Message ID", id)
		      .addField("Author ID", message.author.id)
		      .addField("Author Tag", message.author.tag)
		      .addField("Channel ID", message.channel.id)
		      .addField("Channel Name", message.channel.name)
		      .setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
		      .setFooter(moment().format('MMMM Do YYYY, h:mm:ss a'))
		      channel.send(embed)
    }
})

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

          return;
        }
        if(cmd.startsWith(`${prefix} info`)) {
        	var info = new Discord.RichEmbed()
		    .setTitle(client.user.username)
		    .addField('Owner', '`' + client.users.get('270375857384587264').tag, true)
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
        	console.log('Beginning')
    var r = message.content.split(' ').slice(1).join(' ')    
    var rulesToSet = r.split("-content");
 
  
    if(r[1].length < 1 || !r[1] || !rulesToSet[0] || !rulesToSet[1]) {
        console.log('if no ruleset')
        if(message.guild.id == db.servers.id.hackerworld) {
			fs.exists(`./data/rule.hw.txt`, function(exists) {
            if (exists) {
                console.log('if exists')
                fs.readFile(`./data/rule.hw.txt`, 'utf8', function(err, data) {
                    console.log('read file')
                    if (err) {
                        return console.log(err)
                    }
                    var ruled = new Discord.RichEmbed()
                        .setColor(config.embedcolor)
                        .setTitle(message.guild.name + " Rules")
                        .setDescription(data)
                        .setAuthor(message.guild.name, message.guild.iconURL)
                    message.channel.send({embed: ruled})
                    console.log('send data')
                  });
            } else {
                message.channel.send("You do not have any rules set for this server. You can use `rules set <rules>` to set your server rules.")
                console.log('no file')
            }
        });
        return;        
        }
        if(message.guild.id == db.servers.id.cleverbot) {
			fs.exists(`./data/rule.cb.txt`, function(exists) {
            if (exists) {
                console.log('if exists')
                fs.readFile(`./data/rule.cb.txt`, 'utf8', function(err, data) {
                    console.log('read file')
                    if (err) {
                        return console.log(err)
                    }
                    var ruled = new Discord.RichEmbed()
                        .setColor(config.embedcolor)
                        .setTitle(message.guild.name + " Rules")
                        .setDescription(data)
                        .setAuthor(message.guild.name, message.guild.iconURL)
                    message.channel.send({embed: ruled})
                    console.log('send data')
                  });
            } else {
                message.channel.send("You do not have any rules set for this server. You can use `rules set <rules>` to set your server rules.")
            }
        });
        return;        
        }
        
        }
     
        
    if(args[2] === '-content') {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('MANAGE_GUILD permission required').catch(console.error);

        if(!rulesToSet) return;
        
        function writeRules(serv) {
        	
        	if(!serv) throw console.error("No server provided")
        	
        	var newRules = rulesToSet[1]
        	
        	function rulesSet() {
        	message.channel.send('Rules have been set!')
        	}
        	
        	if(serv.includes("clev")) {
        		
        		var rulePath = db.filePath.rules.cleverbot
        		
        		fs.writeFile(rulePath, newRules, function(err) {
		            
		            if(err) return console.log(err);
		        rulesSet();
		            }); 
       
        		return;
        	}
        	if(serv.includes("hack")) {
        	
        		var rulePath = db.filePath.rules.hackerworld
        		
        		fs.writeFile(rulePath, newRules, function(err) {
		            
		            if(err) return console.log(err);
		        rulesSet();
		            }); 
       
        		
        		return;
        	}
        }
        if(guild.id == db.servers.id.hackerworld) return writeRules("hackerworld")
        if(guild.id == db.servers.id.cleverbot) return writeRules("cleverbot")
        
        }
        	return;
        }
        if(cmd.startsWith(`${prefix} suggestion`)) {
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
