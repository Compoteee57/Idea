const Ban = require('../moderator/Ban'),
    Embed = require('../../utils/Embed'),
    ms = require('ms');

module.exports = {
    name: 'ban',
    args: 1,
    execute(message, args) {
        if(message.member.permissions.has("BAN_MEMBERS")) return new Embed(message).setError("Permission manquante");
        const member = message.mentions.members.first();
        if (!member) return new Embed(message).setError("Membre introuvable");
        if (args.length > 1) {
            const time = ms(args[1]);
            if (!time) return new Embed(message).setError("Cette date n'est pas valide !");
            new Ban(member, message).tempsBan(time);
        } else new Ban(member, message).ban();
    },
};