const { EmbedBuilder } = require('discord.js'),
    dateParser = require('../../utils/DateParser');

module.exports = {
    name: 'server',
    args: 0,
    execute(message) {
        const guild = message.guild,
            icon = guild.iconURL({ dynamic: true }),
            userEmbed = new EmbedBuilder()
            .setColor("E86363")
            .setAuthor(guild.name, icon)
            .setThumbnail(icon)
            .addFieldsss("Créé par", guild.owner, true)
            .addFieldsss("Pays", guild.region, true)
            .addFieldsss("Créé le", dateParser.parseToStringDate(guild.createdAt), true)
            .addFieldsss("Nombre de channel", guild.channels.cache.size, true)
            .addFieldsss("Nombre de membre", guild.members.cache.filter(member => member !== member.bot).size, true)
            .setTimestamp()
            .setFooter(`Command executée par ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        message.channel.send(userEmbed);
    },
};