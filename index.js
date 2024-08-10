require("dotenv").config();

const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');

const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const imageBuffer = await get({
        url: 'https://i.pinimg.com/originals/f3/0f/6a/f30f6acfafbf5b47d760f97ed7b4a99f.jpg',
        encoding: null, 
    });

    await ig.publish.photo({
        file: imageBuffer,
        caption: 'Start doing!',
    });
}

postToInsta();