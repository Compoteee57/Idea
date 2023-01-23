const Embed = require('../../utils/Embed'),
    Mute = require("../moderator/Mute");

module.exports = {
    name: 'unmute',
    args: 1,
    execute(message) {
        const member = message.mentions.members.first();
        if (!member) return new Embed(message).setError("Membre introuvable");
        new Mute(member, message).unmute();
    },
};