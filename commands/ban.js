const { Message, MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {

    let target = message.mentions.members.first();
    let reason = args.slice(1).join(' ');

    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply('Nie masz uprawnień, by zbanować kogokolwiek!')
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('Nie mam uprawnień, by móc zbanować!')
    if(!args[0]) return message.reply('Wskaż osobę do zbanowania!')
    if(!target) return message.reply('Nie ma takiego użytkownika!')
    if(!target.id === message.author.id) return message.reply('Nie możesz zbanować samego siebie!')

    if(target.bannable) {
        target.ban()
        client.modlogs({
            Member: target,
            Action: 'Ban',
            Color: 'RED',
            Reason:  reason
    }, message  
);
    } else {
        return message.reply('Nie mogę zbanować użytkownika, upewnij się, że moja rola jest wyżej niż wszystkie.')
    }
}