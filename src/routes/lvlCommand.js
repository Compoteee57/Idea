const Embed = require('../../utils/Embed'),
    { createCanvas, loadImage, registerFont } = require('canvas'),
    { AttachmentBuilder } = require('discord.js'),
    canvasUtils = require('../../utils/CanvasUtils'),
    Level = require('../level/Level');

module.exports = {
    name: 'rank',
    args: 0,
    async execute(message, args) {
        if (args.length > 0) {
            const member = message.mentions.members.first();
            if (!member) return new Embed(message).setError("Membre introuvable");
            const profile = new Level(member).getProfile(),
                attachment = new MessageAttachment((await canvasLevel(member, profile)).toBuffer(), `${member.id}.png`);
            message.channel.send("", attachment);
        }
        else {
            const member = message.author;
            const profile = new Level(member).getProfile(),
                attachment = new AttachmentBuilder((await canvasLevel(member, profile)).toBuffer(), `${member.id}.png`);
            message.channel.send("", attachment);
        }
    },
};

async function canvasLevel(member, profile) {
    const canvas = createCanvas(900, 300),
        ctx = canvas.getContext("2d");

    registerFont('src/font/lobster.ttf', { family: 'Lobster' })

    const background = await loadImage('./src/level/level.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 40px Lobster";
    ctx.fillStyle = "white";
    ctx.fillText(member.username, 326, 100);

    ctx.font = "normal 20px Lobster";
    ctx.fillStyle = "#39c6c8";
    ctx.fillText(`niveau ${profile.getLevel()}`, 326, 120);

    ctx.font = "15px Lobster";
    ctx.fillStyle = "#474747";
    ctx.fillText(`${profile.current} / ${profile.next}`, 326, 145);

    ctx.fillStyle = "white";
    ctx.fillRect(326, 150, 350, 30);

    const next = profile.next, current = profile.current, max = 350, progress = Math.round(current / next * max);
    ctx.fillStyle = "#39c6c8";
    ctx.fillRect(326, 150, progress, 30);

    const avatarURL = member.avatarURL().endsWith("webp") ? member.avatarURL().replace("webp", "jpg") : member.avatarURL({ dynamic: true });
    const avatar = await loadImage(avatarURL);
    canvasUtils.roundedImage(ctx, 117, 63, 154.5, 155, 100);
    ctx.clip();
    ctx.drawImage(avatar, 120, 65, 150, 150);

    return canvas;
}