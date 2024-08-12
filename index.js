const VideoQueue = require('./queue');
const {logIntoAcc, postVideo} = require('./instagram');
require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');

const app = express();
const upload = multer({dest: "uploads/"});
app.use(express.static('public'));
const videoQueue = new VideoQueue();

app.post("/add_to_queue", upload.fields([{name: "video"}, {name:"cover"}]), async (req, res) => {
    try{
        const username = process.env.IG_USERNAME;
        const password = process.env.IG_PASSWORD;

        const videoPath = req.files.video[0].path;
        const coverPath = req.files.cover[0].path;
        const caption = req.body.caption;

        const videoDetails = {
            videoPath: videoPath,
            coverPath: coverPath,
            caption: caption
        }

        addtoQueue(videoDetails);

        res.send(`Video, ${videoPath} recevied and processed by server!`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while uploading the video");
    }

});

async function addtoQueue(videoDetails){
    videoQueue.enqueue(videoDetails);
    console.log("Video added to the queue!");
    console.log("queue:" + videoQueue.peek().caption); // quick test
}


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})