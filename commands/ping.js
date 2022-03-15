exports.run = (client, message, args) => {
    message.channel.send(`🏓API Latency is ${Math.round(client.ws.ping)}ms`);
}

exports.name = "ping";