const fs = require('fs'),
    Embed = require('../../utils/Embed');

module.exports = class Level {

    constructor(member, message = null) {
        this.content = require('./lvl.json');

        this.member = member;
        this.message = message;

        if(!this.hasProfile()) this.init();
        this.profile = this.content[member.id];

        this.xpWinPerMessage = 5;
    }

    getProfile() {
        return new LevelInfo(this.profile);
    }
    pastLevel() {
        const profile = this.profile;
        profile.current = 0;
        profile.lvl = profile.lvl+=1;
        profile.next = profile.next * 2;
        this.save();

        new Embed(this.message).setInfo(`Vous êtes maintenant niveau \`${profile.lvl}\` bravo ! 🎉`);
    }
    removeXp(count = this.xpWinPerMessage) {
        this.profile.current -= count;
        this.save();
    }
    addXp(count = this.xpWinPerMessage) {
        this.profile.current += count;
        if(this.profile.current >= this.profile.next) return this.pastLevel();
        this.save();
    }
    hasProfile() {
        return this.content[this.member.id];
    }
    init() {
        this.content[this.member.id] = {
          current: 0,
          next: 100,
          lvl: 0
        };
        this.save();
    }

    save() {
        fs.writeFileSync("src/level/lvl.json", JSON.stringify(this.content), (err) => {
            if(err) throw new err;
        });
    }

}

class LevelInfo {

    constructor(profile) {
        this.level = profile.lvl;
        this.next = profile.next;
        this.current = profile.current;
    }

    getLevel() {
        return this.level;
    }

    getNext() {
        return this.next;
    }

    getCurrent() {
        return this.current;
    }

}