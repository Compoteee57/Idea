const Discord = require('discord.js');

class Embed extends Discord.EmbedBuilder {

    constructor(message) {
        super();
        this.message = message;
    }

    setError(title) {
        this.setColor("EB6060")
        this.setDescription(`:x: | ${title}`)
        return this.message.channel.send(this);
    }

    setSuccess(title) {
        this.setColor("64F1A2")
        this.setDescription(`:white_check_mark: | ${title}`)
        return this.message.channel.send(this);
    }

    setInfo(title) {
        this.setColor("64EFF1")
        this.setDescription(`:information_source: | ${title}`)
        return this.message.channel.send(this);
    }

    setWarning(title) {
        this.setColor("F0DA5D")
        this.setDescription(`:warning: | ${title}`)
        return this.message.channel.send(this);
    }

}

module.exports = Embed;