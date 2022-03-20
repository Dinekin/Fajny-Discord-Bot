const mongoose = require('mongoose');

module.exports = mongoose.model('warnings', new mongoose.Schema({
        user: String,
        guildId: String,
        content: String,
    })
)