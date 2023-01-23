const Embed = require('../../utils/Embed');

module.exports = {
    name: 'kick',
    args: 1,
    execute(message) {
        if(message.member.hasPermission("KICK_MEMBERS")) return new Embed(message).setError("Permission manquante");
        const member = message.mentions.members.first();
        if (!member) return new Embed(message).setError("Membre introuvable");
        member.kick().then(() => {
            return new Embed(message).setSuccess("Ce membre a été éjecté !");
        });
    },
};