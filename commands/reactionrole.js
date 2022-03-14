exports.run = async (message, args, client, Discord) => {
    const channel = '522070886665158679';
    const uzytkownik = message.guild.roles.cache.find(role => role.name === "uzytkownik");

    const UzytkownikEmoji = '🥶';

    let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Wybierz role byczku!')
    .setDescription('Wybierz coś no!')
        + `${UzytkownikEmoji} by być byczkiem!`;

    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(UzytkownikEmoji);

    client.on('messageReactionAdd', async (reaction, user) =>{
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === UzytkownikiEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.add(uzytkownik);
            } else {
                return;
            }
        }
    });

    client.on('messageReactionRemove', async (reaction, user) =>{
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.message.channel.id == channel) {
            if (reaction.emoji.name === UzytkownikEmoji) {
                await reaction.message.guild.members.cache.get(user.id).roles.remove(uzytkownik);
            } else {
                return;
            }
        }
    });
}