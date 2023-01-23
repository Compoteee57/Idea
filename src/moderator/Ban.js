const Embed = require('../../utils/Embed'),
    ms = require('ms');

module.exports = class Ban {

    constructor(member, message) {
        this.member = member;
        this.message = message;
    }

    ban(time = null) {
        const member = this.member;
        if(member.roles.highest.position > this.message.member.roles.highest.position || member.guild.owner.id === member.id) return new Embed(this.message).setError("Impossible, le membre a une permission au dessus de la votre !")
        try {
            this.message.guild.members.ban(this.member.user.id).then(() => {
                if(time) return new Embed(this.message).setSuccess(`Membre ${this.member.user.username} banni pendant \`${ms(time)}\` !`)
                return new Embed(this.message).setSuccess(`Membre ${this.member.user.username} banni !`)
            });
        } catch (e) {
            return new Embed(this.message).setError("Erreur inconnue");
        }
    }
    unBan() {
        this.message.guild.members.unban(this.member.user.id).then(() => {
            return new Embed(this.message).setSuccess(`Membre ${this.member.user.username} débanni !`)
        });
    }

    tempsBan(time) {
        this.ban(time);
        setTimeout(() => this.message.guild.ban(this.member.user.id), time);
    }

}