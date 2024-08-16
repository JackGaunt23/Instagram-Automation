function addHtml(videoDetails) {
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
        </div>
    `;
}

module.exports = { addHtml };
