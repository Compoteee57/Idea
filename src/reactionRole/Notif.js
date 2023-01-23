const { EmbedBuilder } = require('discord.js'),
    fs = require('fs');

module.exports = class Notification extends EmbedBuilder {

    constructor(message, title, roleID) {
        super();

        this.setTitle(`Notifications des ${title}`)
        this.setColor("131111")
        this.setDescription("Voulez recevoir des notifications relatif au titre ci-dessus ? \n\n" +
            "✅ | **Activer les notifications** \n \n" +
            "ℹ️ | *cliquez une nouvelle fois sur l'emoji pour désactiver les notifications*")

        message.channel.send(this).then(message => {
            message.react("✅");
            this.registerNotification(message.id, roleID)
        });
    }

    registerNotification(messageID, roleID) {
        const content = require('./reactionRoleList.json');
        content[messageID] = {
            "emojis": [{
                "name": "✅",
                "role": roleID
            }]
        };
        fs.writeFile('src/reactionRole/reactionRoleList.json', JSON.stringify(content), (err) => {
            if(err) throw new err;
        });
    }

}