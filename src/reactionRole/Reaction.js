const fs = require('fs');

module.exports = class Reaction {

    constructor(messageID, reaction) {
        this.content = require('./reactionRoleList.json');
        this.messageID = messageID;

        this.emoteList = [];
        for(const prop in reaction) {
            const react = reaction[prop];
            this.addEmote(react.emoteID, react.type, react.username, react.usernameName, react.author, react.channel);
        }

        this.register();
    }

    addEmote(emoteID, type, username = null, usernameName = null, author = null, channelID = null) {
        this.emoteList.push({
            "name": emoteID,
            "type": type,
            "id": username,
            "usernameName": usernameName,
            "author": author,
            "channelID": channelID
        })
    }

    register() {
        this.content[this.messageID] = {
            "emojis": this.emoteList
        };
        this.save();
    }
    remove() {
        this.content[this.messageID] = null;
        this.save();
    }
    save() {
        fs.writeFile('src/reactionRole/reactionRoleList.json', JSON.stringify(this.content), (err) => {
            if(err) throw new err;
        });
    }

}