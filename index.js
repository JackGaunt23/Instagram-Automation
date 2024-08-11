require("dotenv").config();
const express = require('express');
const multer = require('multer');
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');

const app = express();
const upload = multer({dest: "uploads/"});
app.use(express.static('public'));

app.post("/post", upload.fields([{name: "video"}, {name:"cover"}]), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const videoPath = req.files.video[0].path;
    const coverPath = req.files.cover[0].path;
    postToInsta(username, password, videoPath, coverPath);
})


const postToInsta = async (username, password, videoPath, coverPath) => {
    const ig = new IgApiClient();
    ig.state.generateDevice(username);
    await ig.account.login(username, password);

    const videoBuffer = fs.readFileSync(videoPath); //"C:/Users/jackg/Videos/letthingsbe_testvid.mp4"
    const coverImage = fs.readFileSync(coverPath); //C:/Users/jackg/Downloads/Screenshot 2024-08-11 123506.jpg

    const videoOptions = {
        video: videoBuffer,
        coverImage: coverImage,
        caption: 'Let things be',
    };

    await ig.publish.video(videoOptions);
}


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})