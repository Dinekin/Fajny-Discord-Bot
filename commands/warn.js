const warnSchema = require('../models/warnModel')
const { Message, MessageEmbed } = require('discord.js')

exports.run = async(client, message, args) => {
    mentiondm = message.mentions.users.first();
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('Nie masz uprawnień by użyć tej komendy!')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Nie znaleziono użytkownika.')
    const reason = args.slice(1).join(' ')
    warnSchema.findOne({ guildid: message.guild.id, user: user.user.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            data = new warnSchema({
                guildid: message.guild.id,
                user: user.user.id,
                content: [
                    {
                        moderator: message.author.id,
                        reason: reason
                    }
                ]
            })
        } else {
            const obj = {
                moderator: moderator.author.id,
                reason: reason
            }
            data.content.push(obj)
        }
        data.save()
    })
    mentiondm.send(obj)
}