const { EmbedBuilder } = require('discord.js'),
    dateParser = require('../../utils/DateParser'),
    Embed = require('../../utils/Embed');

module.exports = {
    name: 'user',
    args: 1,
    execute(message) {
        const member = message.mentions.members.first();
        if (!member) return new Embed(message).setError("Membre introuvable");
        const userEmbed = new EmbedBuilder()
            .setColor("E86363")
            .setAuthor(`Profil de ${member.user.tag}`, member.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .addFields("Roles", member.roles.cache.size > 1 ? member.roles.cache.filter(role => role.name !== "@everyone").map(role => { return role }) : "aucun role", true)
            .addFields("Inscrit depuis le", dateParser.parseToStringDate(member.user.createdAt), true)
            .addFields("Inscrit sur le serveur depuis le ", dateParser.parseToStringDate(member.joinedAt))
            .addFields("Tag", member.user.tag.replace(/.+#/g, ""), true)
            .setTimestamp()
            .setFooter(`Command executée par ${message.author.tag}`, member.user.avatarURL({ dynamic: true }))

        message.channel.send({ embed: [Embed]});
    },
};