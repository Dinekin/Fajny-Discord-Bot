exports.run =  async (client, message, args, Discord) => {
        const { channel } = require('../config.json');
        const { GP0001Emoji } = require('../config.json')
        const { GP0001Name } = require('../config.json')
        const { GP0700Emoji } = require('../config.json')
        const { GP0700Name } = require('../config.json')
        const { GP1100Emoji } = require('../config.json')
        const { GP1100Name } = require('../config.json')
        const { GP1600Emoji } = require('../config.json')
        const { GP1600Name } = require('../config.json')
        const { GP2000Emoji } = require('../config.json')
        const { GP2000Name } = require('../config.json')
        const { GP2200Emoji } = require('../config.json')
        const { GP2200Name } = require('../config.json')
        const { GP2330Emoji } = require('../config.json')
        const { GP2330Name } = require('../config.json')
        

        const { MessageEmbed } = require('discord.js')
        let AAAAembed = new MessageEmbed()
            .setColor('#17b111')
            .setTitle('React to the corresponding emojis to get personalized notifications!')
            .setDescription('Once reacting you will gain your roles!\n\n'
                + `${GP0001Emoji} by otrzymać ${GP0001Name}\n`
                + `${GP0700Emoji} by otrzymać ${GP0700Name}\n`
                + `${GP1100Emoji} by otrzymać ${GP1100Name}\n`
                + `${GP1600Emoji} by otrzymać ${GP1600Name}\n`
                + `${GP2000Emoji} by otrzymać ${GP2000Name}\n`
                + `${GP2200Emoji} by otrzymać ${GP2200Name}\n`
                + `${GP2330Emoji} by otrzymać ${GP2330Name}\n`) 



        console.log("Reactionrole Message Created")
        let msg = await message.channel.send({ embeds: [AAAAembed]});
        msg.react(`${GP0001Emoji}`)
        msg.react(`${GP0700Emoji}`)
        msg.react(`${GP1100Emoji}`)
        msg.react(`${GP1600Emoji}`)
        msg.react(`${GP2000Emoji}`)
        msg.react(`${GP2200Emoji}`)
        msg.react(`${GP2330Emoji}`)
    }

    exports.name = "reactionrole";