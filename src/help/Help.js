const helpCommands = require('./HelpCommands'),
    Discord = require('discord.js');

class Help extends Discord.EmbedBuilder {

    constructor(prefix, message) {
        super();
        this.setTitle("Menu d'aide:")
        this.setColor("141617");
        for (const property in helpCommands) {
            const command = helpCommands[property];
            this.addFields(prefix + command.name, `
                arguments: ${command.args.length === 0 ? "aucun" : command.args.join(", ")} 
                permissions: ${command.permissions.length === 0 ? "aucune" : command.permissions.join(", ")}
               \`${command.description}\`
            `)
        }
        this.setDescription("**Légende** [argument] obligatoire, <argument> facultatif")
        this.setTimestamp();
        this.setFooter(`Command executée par ${message.author.tag}`, message.author.avatarURL)

        message.channel.send(this);
    }

}

module.exports = Help;