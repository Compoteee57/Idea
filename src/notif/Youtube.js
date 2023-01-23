const axios = require('axios'),
    fs = require('fs');

module.exports = class Youtube {

    constructor(client) {
        const guild = client.guilds.cache.get("768947712993263656"),
            channel = guild.channels.cache.get("770076148783906856");

        this.channel = channel;

        this.message = `Nouvelle video de La Quisine, allez la voir `;
        this.timeOut = 1e4;

        this.alreadyUploaded = require('./videos.json');

        this.getLastHomeVideo();
        this.getLastVideo();
    }

    getLastHomeVideo() {
        setInterval(() => {
            axios.get("https://www.youtube.com/channel/UCqFE6df9eu1i31Z3tFGUfcw")
                .then(({ data }) => {
                    if(!data) return;
                    const json = data.split("\"responseContext\"").pop(),
                        content = json.split("}},\"content\":")[1];
                    if(!content) return;
                    const contentC = content.split("\"trackingParams\":")[0].replace(/,$/, "").concat("}}]}}"),
                        videoID = JSON.parse(contentC).horizontalListRenderer.items[0].gridVideoRenderer.videoId,
                        videoURL = `https://www.youtube.com/watch?v=${videoID}`;

                    if(this.hasVideo(videoID)) return;
                    this.save(videoID);
                    this.channel.send(this.message.concat(videoURL));
                }).catch(console.error);
        }, this.timeOut);
    }

    getLastVideo() {

        setTimeout(() => {
            axios.get("https://www.youtube.com/channel/UCqFE6df9eu1i31Z3tFGUfcw/videos")
                .then(({ data }) => {
                    if(!data) return;
                    const json = data.split("\"responseContext\"").pop();
                    const content = json.split("\"title\":\"Vidéos\",\"selected\":true,")[1];
                    if(!content) return;
                    const contentC = content.split("    window[\"ytInitialPlayerResponse\"] = null;")[0].split(",\"trackingParams\":")[0].concat("}}]}}]}}]}}}").replace(/^/, "{"),
                        lastVideo = JSON.parse(contentC).content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items[0].gridVideoRenderer,
                        videoID = lastVideo.videoId,
                        videoURL = `https://www.youtube.com/watch?v=${videoID}`;

                    if(this.hasVideo(videoID)) return;
                    this.save(videoID);
                    this.channel.send(this.message.concat(videoURL));
                }).catch(console.error);
        }, this.timeOut);
    }

    hasVideo(videoID) {
        return this.alreadyUploaded.includes(videoID);
    }

    save(videoID) {
        this.alreadyUploaded.push(videoID);
        fs.writeFile('src/notif/videos.json', JSON.stringify(this.alreadyUploaded), (err) => {
            if(err) throw new err;
            this.alreadyUploaded = require('./videos.json');
        });
    }

}