const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const config = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');

//Flagi potrzebne do jakichkolwiek funkcji bota
const client = new Client({ intents: [Intents.FLAGS.GUILDS, 
                                    Intents.FLAGS.GUILD_MEMBERS, 
                                    Intents.FLAGS.GUILD_MESSAGES, 
                                    Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

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

//Kod odpowiedzialny za dołączanie nowego użytkownika do serwera
client.on('guildMemberAdd', member => {
    console.log('Użytkownik ' + member.user.username +  ' dołączył do serwera!');
    member.roles.add("952754275841355786"); //ID roli
    member.guild.channels.cache.get('952756912326316032').send(`Witamy w rodzince ${member}`); //ID kanału gdzie ma odbywać się wysyłanie wiadomości 
});

//Kod odpowiedzialny za wyjście użytkownika ze serwera
client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get('952756912326316032').send(`${member} wyszedł, ale frajer!`);
} )

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