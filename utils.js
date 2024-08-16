function addHtml(videoDetails, index) {
    return `
        <div class="video-container">
            <div class="video-item">
                <video src="${videoDetails.videoPath}" controls></video>
            </div>
            <div class="video-item">
                <img src="${videoDetails.coverPath}" alt="Cover Image">
            </div>
            <div class="video-item caption">
                <p>${videoDetails.caption}</p>
            </div>
            <button class="delete-button" data-index="${index}">Delete</button>
        </div>
    `;
}

module.exports = { addHtml };
