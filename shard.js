const Discord = require('discord.js');
const config = require('./data/config.json')
const fs = require('fs')

const Manager = new Discord.ShardingManager('./index.js', {token: config.token});

/*
	2500 servers -> 2 Shards
	
	0.0008 shards per server
	
	guild_count * 0.0008 = shard_count

*/

fs.readFile("./data/guildCount", 'utf8', function(err, guildCount) {
	if(err) return console.log(err)

guildCount = parseInt(guildCount)

var neededShards = Math.round(parseInt(0.0008 * guildCount))
neededShards = parseInt(neededShards)

fs.writeFile("./data/shardCount", 'utf8', function(err) {
	if(err) return console.log(err)
})

Manager.spawn(neededShards); // This example will spawn 2 shards (5,000 guilds);


})



