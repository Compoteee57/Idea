const reactionRoleList = require('./reactionRoleList.json'),
    Reaction = require('./Reaction'),
    { EmbedBuilder } = require('discord.js');

let choosen = {};

module.exports = class ReactionRole {

    constructor(reaction, user, client) {
        if(user.bot) return;
        const reactionRoleElement = reactionRoleList[reaction.message.id];
        if(!reactionRoleElement) return;
        const emote = reactionRoleElement.emojis.find(emoji => emoji["name"] === reaction.emoji["name"]);

        this.reaction = reaction;
        this.user = user;
        this.emote = emote;
        this.client = client;
        this.guild = this.client.guilds.cache.get("671606123488608256");

        this.content = reactionRoleList;
    }

    removeReact() {
        if(this.emote && !this.emote.id) this.reaction.message.members.cache.get(this.user).roles.remove(this.emote.role);
    }

    addReact() {
        if(!this.reaction) return;
        const member = this.user;
        if(this.emote.type && this.emote.type === "dmAccepted") {
            if(member.id !== this.emote.id || member.id === this.emote.author) return;
            const acceptedEmbed = new EmbedBuilder()
                .setDescription("Choisissez entre pierre feuille ou ciseau \n " + "🌑 | **Pierre** \n" + "📄 | **Feuille** \n" + "✂ | **Ciseau**");
            const id = this.emote.author,
                dual = this.client.users.cache.get(id);
            if(!this.emote.channelID) this.channelID = this.emote.channelID;
            member.send(acceptedEmbed).then(message => reactionShifumi(message, member, this.channelID));
            dual.send(acceptedEmbed).then(message => reactionShifumi(message, member, this.channelID));
        } else if(this.emote.type && this.emote.type === "dmRefused") {
            if(member.id !== this.emote.id || member.id === this.emote.author) return;
            this.reaction.message.delete().then(message => message.channel.send("Votre partenaire à refusé votre duel."))
        } else if(this.emote.type && this.emote.type === "choosen") {
            if(choosen[this.emote.id]) {
                const username = this.emote.id,
                    usernameName = this.emote.usernameName,
                    whatAuthor = this.emote.what,
                    whatDual = choosen[this.emote.id].what;
                if(whatAuthor === whatDual) noWinner(member, username, this.client);
                else if(whatAuthor === "pierre" && whatDual === "ciseau") winner(member, username, member.username, this.client, this.channelID, this.guild)
                else if(whatAuthor === "feuille" && whatDual === "pierre") winner(member, username, member.username, this.client, this.channelID, this.guild)
                else if(whatAuthor === "ciseau" && whatDual === "feuille") winner(member, username, member.username, this.client, this.channelID, this.guild)
                else winner(member, username, usernameName, this.client, this.channelID, this.guild)
                return;
            }

            choosen[member.id] = {
                what: this.reaction.emoji["name"],
                username: member.id
            }
        } else {
            if(this.emote) member.roles.add(this.emote.role);
            else this.reaction.users.remove(this.user)
        }
    }

}



function noWinner(member, author, client) {
    const txt = "Personne n'a gagné",
        user = client.users.cache.get(author);
    member.send(txt)
    user.send(txt)
}
function winner(member, author, who, client, channelID, guild) {
    const embed = new EmbedBuilder().setDescription(`${who} a gagné le shifumi !`)

    const txt = `${who} a gagné !`,
        user = client.users.cache.get(author);
    member.send(txt)
    user.send(txt)

}

function reactionShifumi(message, member, channelID) {
    message.react("🌑");
    message.react("📄");
    message.react("✂");

    new Reaction(message.id, [{
        emoteID: "🌑",
        type: "choosen",
        what: "rock",
        username: member.id,
        usernameName: member.username,
        author: message.author.id,
        channelID: channelID
    },
    {
        emoteID: "📄",
        type: "choosen",
        what: "paper",
        username: member.id,
        usernameName: member.username,
        author: message.author.id,
        channelID: channelID
    },
    {
        emoteID: "✂",
        type: "choosen",
        what: "ciseau",
        username: member.id,
        usernameName: member.username,
        author: message.author.id,
        channelID: channelID
    }])
}