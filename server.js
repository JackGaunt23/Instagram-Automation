const VideoQueue = require('./queue');
const {logIntoAcc, postVideo} = require('./instagram');
const {addHtml} = require('./utils');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

require("dotenv").config();
const app = express();
const upload = multer({dest: "uploads/"});
app.use(express.static(path.join(__dirname, 'public')));
const videoQueue = new VideoQueue();

let htmlContent = '';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission to add video to queue
app.post('/add_to_queue', upload.fields([{ name: 'video' }, { name: 'cover' }]), async (req, res) => {
    try {
        const videoPath = req.files.video[0].path;
        const coverPath = req.files.cover[0].path;
        const caption = req.body.caption;

        const videoDetails = {
            videoPath: videoPath,
            coverPath: coverPath,
            caption: caption
        };

        addToQueue(videoDetails);
        res.send("Video added to queue.");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while uploading the video");
    }
});

// Serve the current queue HTML
app.get('/get-queue-html', (req, res) => {
    res.send(htmlContent);
});

app.delete('/delete_from_queue/:index', (req, res) => {
    try{
        const index = parseInt(req.params.index, 10);
        videoQueue.dequeue(index);
        htmlContent = '';
        videoQueue.queue.forEach((videoDetails, i) => {
            htmlContent += addHtml(videoDetails, i);
        });
        res.send("Item deleted successfully");
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send("An error occurred while deleting the item");
    }
});

// Function to add video to queue and update HTML content
function addToQueue(videoDetails) {
    videoQueue.enqueue(videoDetails);
    htmlContent += addHtml(videoDetails);
    console.log("Video added to the queue!");
    console.log("Queue:" + videoQueue.peek().caption); // quick test
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});