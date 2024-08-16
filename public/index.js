async function updateQueue() {
    try {
        const response = await fetch('/get-queue-html');
        const newHtml = await response.text();
        document.getElementById('video-queue').innerHTML = newHtml;
    } catch (error) {
        console.error('Error updating queue:', error);
    }
}

document.getElementById('videoForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(this);

    try {
        // Send POST request to add video to queue
        const response = await fetch('/add_to_queue', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Video added to queue successfully!');
            updateQueue(); // Update the queue after successful addition
        } else {
            console.error('Failed to add video to queue');
        }
    } catch (error) {
        console.error('Error adding video to queue:', error);
    }
});

// Initial update to display current queue on page load
updateQueue();
