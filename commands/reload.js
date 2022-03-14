exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply("Musisz podać nazwę komendy do przeładowania.")
    const commandName = args[0];
    // Sprawdź czy komenda istnieje i czy jest poprawna
    if (!client.commands.has(commandName)) {
        return message.reply("Taka komenda nie istnieje!");
    }
    // Ścieżka do komendy
    delete require.cache[require.resolve(`./${commandName}.js`)];
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.reply(`Komenda ${commandName} została przeładowana!`);
    };

    exports.name = "reload";