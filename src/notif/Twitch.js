const { apiClient } = require('twitch');

module.exports = class Twitch {

    constructor(client) {
        const guild = client.guilds.cache.get("671606123488608256"),
            channel = guild.channels.cache.get("744303464720498769"),
            name = "laquisine";

        let twitchLive = false;

        setTimeout(() => {
            const user = apiClient.helix.users.getUserByName(name).then(() => {
                if(user) {
                    const stream = apiClient.helix.streams.getStreamByUserId(user.id).then(() => {
                       if(stream) {
                           if(!twitchLive) {
                               twitchLive = true;
                               channel.send(`LaQuisine est maintenant en live ! https://twitch.tv/${name}`);
                           }
                       } else {
                           if(twitchLive)
                               twitchLive = false;
                       }
                    });
                }
            });
        }, 1e3);
    }

}