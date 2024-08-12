const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');

async function postVideo(igAccount, videoDetails){
    const videoBuffer = fs.readFileSync(videoDetails.videoPath);
    const coverImageBuffer = fs.readFileSync(videoDetails.coverPath); 

    try {
        await igAccount.publish.video({
            video: videoBuffer,
            coverImage: coverImageBuffer,
            caption: videoDetails.caption,
        });
        console.log('Video posted successfully!');
    } catch (error) {
        console.error('Error posting video:', error);
    }
}

async function logIntoAcc(username, password){
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
}

module.exports = {postVideo, logIntoAcc};
