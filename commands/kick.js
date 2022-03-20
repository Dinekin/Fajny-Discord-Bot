const { Message, MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {

    let target = message.mentions.members.first();
    let reason = args.slice(1).join(' ');

    if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply('Nie masz uprawnień, by kicknąć kogokolwiek!')
    if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply('Nie mam uprawnień, by móc kicknąć z serwera!')
    if(!args[0]) return message.reply('Wskaż osobę do wyrzucenia!')
    if(!target) return message.reply('Nie ma takiego użytkownika!')
    if(!target.id === message.author.id) return message.reply('Nie możesz kicknąć samego siebie!')

    if(target.kickable) {
        target.kick()
        client.modlogs({
            Member: target,
            Action: 'Kick',
            Color: 'PURPLE',
            Reason:  reason
    }, message  
);
    } else {
        return message.reply('Nie mogę kicknąć użytkownika, upewnij się, że moja rola jest wyżej niż wszystkie.')
    }
}