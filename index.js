const { Client, Intents } = require('discord.js-selfbot-v13');
const config = require('./config')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// Bot ready event

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Fetch a guild and channel 
    const guild = client.guilds.cache.get(config.SERVER_ID);  
    const channel = guild.channels.cache.get(config.CHANNEL_ID);  

    // Fetch all members in the server
    const members = await guild.members.fetch();

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    members.forEach(async (member) => {
        const botId = '426537812993638400';  // Bloxlink ID
        const commandName = 'update'; // Command
    
        // Send the slash command using the member's ID
        await channel.sendSlash(botId, commandName, member.id);
    
        console.log(`Updated bloxlink user: ${member.user.tag}`);
    
        // Add a 5-second delay between each request
        await delay(config.DELAY);
    });
});

// Login to Discord
client.login(config.TOKEN);
