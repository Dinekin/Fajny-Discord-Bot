const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const config = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const { channel } = require('./config.json');
const { MaleEmoji } = require('./config.json');
const { MaleRole } = require('./config.json');
const { FemaleEmoji } = require('./config.json');
const { FemaleRole } = require('./config.json');

//Flagi potrzebne do jakichkolwiek funkcji bota
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS"] });

client.config = config;
client.commands = new Collection();
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${file}`)

    console.log(`Wczytywanie komendy ${commandName}`);
    client.commands.set(commandName, command);
}
    
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`)
    client.on(eventName, event.bind(null, client));
    }
    

client.once('ready', () => {
    console.log('Gotowe byczku!');
});

client.guilds.cache.forEach(g => {      
      g.roles.fetch();
});

//Kod odpowiedzialny za dołączanie nowego użytkownika do serwera
client.on('guildMemberAdd', member => {
    console.log('Użytkownik ' + member.user.username +  ' dołączył do serwera!');
    member.roles.add("952754275841355786"); //ID roli
    member.guild.channels.cache.get('952756912326316032').send(`Witamy w rodzince ${member}`); //ID kanału gdzie ma odbywać się wysyłanie wiadomości 
});

//Kod odpowiedzialny za wyjście użytkownika ze serwera
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get('952756912326316032').send(`${member} wyszedł, ale frajer!`);
});

client.on('messageReactionAdd', async (reaction, user) => { //here
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === MaleEmoji) { //you copy
            await reaction.message.guild.members.cache.get(user.id).roles.add(MaleRole); //these 3
        } //lines
        if (reaction.emoji.name === FemaleEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(FemaleRole);
        }
    }
}
);

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === MaleEmoji) { //you copy
            await reaction.message.guild.members.cache.get(user.id).roles.remove(MaleRole); //these 3
        } //lines
        if (reaction.emoji.name === FemaleEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(FemaleRole);
        }
    }
}
); //to here

// Kod odpowiedzialny za giweleje
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;

client.login(config.token);