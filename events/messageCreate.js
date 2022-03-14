module.exports = (client, message) => {
    //ignoruj boty
    if (message.author.bot) return;

    //ingoruj wiadomości które nie rozpoczynają się prefixem (do zmiany w config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    
    //jesli komenda nie istnieje to nic nie rob
    if (!cmd) return;
    cmd.run(client, message, args);
};