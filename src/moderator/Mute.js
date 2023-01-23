const Embed = require('../../utils/Embed'),
    ms = require('ms'),
    { prefix } = require('../../config.json');

module.exports = class Mute {

    constructor(member, message) {
        const muteRole = member.guild.roles.cache.find(role => role.name === "muted");
        if(!muteRole) return new Embed(message).setError("Role `muted` introuvable !");

        this.muteRole = muteRole;
        this.member = member;
        this.message = message;
        this.timeOut = null;
    }

    isMuted() {
        return this.member.roles.cache.get(this.muteRole.id);
    }
    addMuted(time = null) {
        this.member.roles.add(this.muteRole).then(() => {
            if(time) new Embed(this.message).setSuccess(`Ce membre est muet pendant \`${ms(time, { long: true })}\``);
            else new Embed(this.message).setSuccess("Ce membre est muet !");
            new Embed(this.message).setInfo(`Pour le démuté faites \`${prefix}unmute [membre]\``);
        });
    }
    removeMuted() {
        this.member.roles.remove(this.muteRole).then(() => {
            if(this.timeOut) this.cancelTempsMute();
            new Embed(this.message).setSuccess("Ce membre n'est plus muet !");
        });
    }
    mute(time = null) {
        if(this.isMuted()) return new Embed(this.message).setError("Désolé, mais cette personne est déjà muette.")
        this.addMuted(time);
    }
    unmute() {
        if(!this.isMuted()) return new Embed(this.message).setError("Désolé, mais cette personne n'est pas muette.")
        this.removeMuted();
    }
    setTempsMute(time) {
        this.mute(time);
        this.timeOut = setTimeout(() => this.unmute(), time);
    }
    cancelTempsMute() {
        clearTimeout(this.timeOut);
        this.timeOut = null;
    }

}