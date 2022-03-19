const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');
const config = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const { channel } = require('./config.json');
const { GP0001Emoji } = require('./config.json')
const { GP0001Role } = require('./config.json')
const { GP0700Emoji } = require('./config.json')
const { GP0700Role } = require('./config.json')
const { GP1100Emoji } = require('./config.json')
const { GP1100Role } = require('./config.json')
const { GP1600Emoji } = require('./config.json')
const { GP1600Role } = require('./config.json')
const { GP2000Emoji } = require('./config.json')
const { GP2000Role } = require('./config.json')
const { GP2200Emoji } = require('./config.json')
const { GP2200Role } = require('./config.json')
const { GP2330Emoji } = require('./config.json')
const { GP2330Role } = require('./config.json')

const cron = require("cron").CronJob;

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

// Kod odpowiedzialny za przydzielenie roli do użytkownika
client.on('messageReactionAdd', async (reaction, user) => { //here
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === GP0001Emoji) { //you copy
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP0001Role); //these 3
        } //lines
        if (reaction.emoji.name === GP0700Emoji) { //you copy
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP0700Role); //these 3
        } //lines
        if (reaction.emoji.name === GP1100Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP1100Role);
        }
        if (reaction.emoji.name === GP1600Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP1600Role);
        }
        if (reaction.emoji.name === GP2000Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP2000Role);
        }
        if (reaction.emoji.name === GP2200Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP2200Role);
        }
        if (reaction.emoji.name === GP2330Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(GP2330Role);
        }
    }
}
);

// Kod odpowiedzialny za odebranie roli użytkownikowi
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.emoji.name === GP0001Emoji) { //you copy
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP0001Role); //these 3
    } //lines
    if (reaction.emoji.name === GP0700Emoji) { //you copy
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP0700Role); //these 3
    } //lines
    if (reaction.emoji.name === GP1100Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP1100Role);
    }
    if (reaction.emoji.name === GP1600Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP1600Role);
    }
    if (reaction.emoji.name === GP2000Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP2000Role);
    }
    if (reaction.emoji.name === GP2200Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP2200Role);
    }
    if (reaction.emoji.name === GP2330Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.remove(GP2330Role);
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


//Kod odpowiedzialny za wszelakie przypominajki

const GP0001 = new cron('01 0 * * *', async function() {
        console.log('Powiadomienie GP o 00:01 wysłane!');
        const guild = client.guilds.cache.get('902585717153206324');

        if (guild) {
            const channel = guild.channels.cache.get('954861533832298536');
            await channel.send(`<@&952754275841355786> dziala`)
            .catch(err => {
                console.error(err);
            });
        }
 });

 const  GP0700 = new cron('00 7 * * *', async function() {
    console.log('Powiadomienie GP o 7:00 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});

const GP1100 = new cron('00 11 * * *', async function() {
    console.log('Powiadomienie GP o 11:00 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});

const GP1600 = new cron('00 16 * * *', async function() {
    console.log('Powiadomienie GP o 16:00 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});

const GP2000 = new cron('00 20 * * *', async function() {
    console.log('Powiadomienie GP o 20:00 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});

const GP2200 = new cron('00 22 * * *', async function() {
    console.log('Powiadomienie GP o 22:00 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});

const GP2330 = new cron('30 23 * * *', async function() {
    console.log('Powiadomienie GP o 23:30 wysłane!');
    const guild = client.guilds.cache.get('902585717153206324');

    if (guild) {
        const channel = guild.channels.cache.get('954861533832298536');
        await channel.send(`<@&952754275841355786> dziala`)
        .catch(err => {
            console.error(err);
        });
    }
});
GP0001.start();
GP0700.start();
GP1100.start();
GP1600.start();
GP2000.start();
GP2200.start();
GP2330.start();

client.login(config.token);