const fs = require('fs'),
    Discord = require('discord.js'),
    Embed = require('../utils/Embed'),
    { prefix } = require('../config.json');

class Routes {

    constructor() {
        this.commands = new Discord.Collection();
    }

    execute(command, message, args) {
        if(!this.commands.has(command)) return new (require('./help/Help'))(prefix, message);
        try {
            const commandC = this.commands.get(command)
            if(commandC.args > args.length) return new Embed(message).setError("Argument manquant")
            commandC.execute(message, args)
        } catch (error) {
            console.error(error);
        }
    }

    init() {
        const commandFiles = fs.readdirSync('src/routes/').filter(file => file.endsWith('.js'));
        commandFiles.forEach(file => {
            const command = require(`./routes/${file}`);
            this.commands.set(command.name, command);
        })
    }

}

module.exports = Routes;