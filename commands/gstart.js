const ms = require('ms');

exports.run = async(client, message, args) => {

    // Jeśli user nie ma odpowiednich uprawnień.
    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('Nie masz odpowiednich uprawnień, aby przeprowadzić giveaway!');
    }

    // Kanał giveaway
    let giveawayChannel = message.mentions.channels.first()
    // Jeśli kanał nie został wybrany
    if (!giveawayChannel) {
        return message.channel.send('Musisz wybrać odpowiedni kanał!');
    }

    // Czas trwania giveaway
    let giveawayDuration = args[1];
    // Jeśli czas trwania jest nieprawidłowy
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send('Musisz wybrać odpowiedni czas!');
    }

    // Liczba wygranych
    let giveawayNumberWinners = args[2];
    // Jeśli wybrana liczba wygranych nie jest liczbą
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('Musisz wybrać prawidłową liczbę wygranych!');
    }

    // Nagroda
    let giveawayPrize = args.slice(3).join(' ');
    // Jeśli nie wybrano nagrody
    if (!giveawayPrize){
        return message.channel.send('Musisz wybrać właściwą nagrodę!');

    }
    message.delete();
    // Rozpocznij giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // Czas trwania
        duration: ms(giveawayDuration),
        // Nagroda
        prize: giveawayPrize, 
        // Liczba wygranych
        winnerCount: parseInt(giveawayNumberWinners),
        // Kto jest hostem
        hostedBy: client.config.hostedBy ? message.author : null,
        // Wiadomości
        messages: {
            giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
            giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
            drawing: 'Drawing: {timestamp}',
            dropMessage: 'Be the first to react with 🎉 !',
            inviteToParticipate: 'React with 🎉 to participate!',
            winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
            embedFooter: '{this.winnerCount} winner(s)',
            noWinner: 'Giveaway cancelled, no valid participations.',
            hostedBy: 'Hosted by: {this.hostedBy}',
            winners: 'Winner(s):',
            endedAt: 'Ended at',
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway rozpoczęty! @everyone`);
}
    