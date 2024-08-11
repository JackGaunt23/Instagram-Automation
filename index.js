require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const fs = require('fs');

const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const videoBuffer = fs.readFileSync("C:/Users/jackg/Videos/letthingsbe_testvid.mp4");
    const coverImage = fs.readFileSync("C:/Users/jackg/Downloads/Screenshot 2024-08-11 123506.jpg");

    const videoOptions = {
        video: videoBuffer,
        coverImage: coverImage,
        caption: 'Let things be',
    };

    await ig.publish.video(videoOptions);
}

postToInsta();