const Embed = require('../../utils/Embed'),
    Notif = require('../reactionRole/Notif');

module.exports = {
    name: 'notif',
    args: 2,
    execute(message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return new Embed(message).setError("Vous n'avez pas la permission requise !")
        const role = message.mentions.roles.first();
        if(!role) return new Embed(message).setError("Veuillez mentionner un rôle !");
        let title = "";
        for(let i = 0; i < args.length; i++) {
            if(i !== 0) title += args[i] + " ";
        }
        if(!title) return new Embed(message).setError("Aucun titre trouvé !")
        return new Notif(message, title, role.id);
    },
};