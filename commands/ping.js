exports.run = (client, message, args) => {
    message.reply('Sprawdzanie pingu...').then(resultMessage => { 
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        message.reply(`🏓 Opóźnienie bota: ${ping}ms, 🏓 Opóźnienie API: ${client.ws.ping}ms`)
    })
    
}

exports.name = "ping";