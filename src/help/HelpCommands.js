module.exports = {

    helpMessage: (prefix, message, default_radio) => {
        const helpEmbed = new Discord.EmbedBuilder()
            .setColor('FF8B00')
            .setTitle("Commandes d'aide:")
            .setDescription(`
                ${prefix}join - Connecter le bot radio.
                ${prefix}leave - Déconnecter le bot radio.
                ${prefix}kick x - kick la personne durant x secondes.
                ${prefix}ban x - ban la personne durant x secondes.
                ${prefix}rank - Affiche ton rank.
                ${prefix}server - Statistiques du serveur.
                ${prefix}user - Infos sur l'utilisateur.
                ${prefix}bot - Infos sur le bot.
                ${prefix}avatar - Affiche l'avatar.
                ${prefix}ttt - Joué au Tic Tac Toe.
            `)
            .setTimestamp()
            .setFooter(`Commande executée par ${message.author.username}`, message.author.avatarURL)
        message.channel.send(helpEmbed)
    }

}