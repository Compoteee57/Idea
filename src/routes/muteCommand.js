const Embed = require('../../utils/Embed'),
    Mute = require("../moderator/Mute"),
    ms = require('ms');

module.exports = {
    name: 'mute',
    args: 1,
    execute(message, args) {
        if(message.member.permissions.has("MANAGE_MESSAGES")) return new Embed(message).setError("Permission manquante");
        const member = message.mentions.members.first();
        if (!member) return new Embed(message).setError("Membre introuvable");
        if (args.length > 1) {
            const time = ms(args[1]);
            if (!time) return new Embed(message).setError("Cette date n'est pas valide !");
            new Mute(member, message).setTempsMute(time);
        } else new Mute(member, message).mute();
    },
};