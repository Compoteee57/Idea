const { GatewayIntentBits } = require('discord.js');

const Discord = require('discord.js'),
    client = new Discord.Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] }),
    Routes = require('./src/routes'),
    routes = new Routes(),
    ReactionRole = require('./src/reactionRole/ReactionRole'),
    Level = require('./src/level/Level'),
    { prefix, token } = require('./config.json'),
    canvas = { createCanvas, loadImage, registerFont } = require('canvas'),
    canvasUtils = require("./utils/CanvasUtils");

routes.init();

client.on('ready', () => {
    client.user.setActivity(`Radio | ${prefix}help`, { type: "PLAYING" });

    new (require('./src/notif/Youtube'))(client);
});

client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;
    new Level(message.author, message).addXp();

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/),
        command = args.shift().toLowerCase();
    routes.execute(command, message, args);
})

client.on('messageReactionAdd', (reaction, user) => new ReactionRole(reaction, user, client).addReact());
client.on('messageReactionRemove', (reaction, user) => new ReactionRole(reaction, user, client).removeReact());

client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.get("704106320848093234"),
        attachment = new Discord.MessageAttachment((await welcomeCanvas(member)).toBuffer(), `${member.id}.png`);

    channel.send("", attachment);

    const joinRole = member.guild.roles.cache.find(role => role.name === "🍳 | Apprenti");
    member.roles.cache.add(joinRole);
});

async function welcomeCanvas(member) {
    const canvas = createCanvas(1024, 500),
        ctx = canvas.getContext("2d");

    registerFont('src/font/lobster.ttf', { family: 'Lobster' })

    const background = await loadImage('./welcome.png'),
        midd = (canvas.width / 2) - 70;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold 40px Lobster";
    ctx.fillStyle = "#474747";
    ctx.fillText(`Bienvenue ${member.user.username} sur ${member.guild.name}`, 150, 300);

    const avatarURL = member.user.avatarURL({ format: "png", dynamic: true });
    const avatar = await loadImage(avatarURL);
    canvasUtils.roundedImage(ctx, midd - 2, 63, 154.5, 154, 100);
    ctx.clip();
    ctx.drawImage(avatar, midd, 65, 150, 150);

    return canvas;
}

client.login(token).then(() => console.log(`Client ${client.user.tag} connected !`));