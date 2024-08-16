async function updateQueue() {
    try {
        const response = await fetch('/get-queue-html');
        const newHtml = await response.text();
        document.getElementById('video-queue').innerHTML = newHtml;

        document.querySelectorAll('.delete-button').forEach((button) => {
            button.addEventListener('click', async function () {
                console.log('delete button clicked');
                const index = this.getAttribute('data-index');
                await deleteItem(index);
            })
        });
    } catch (error) {
        console.error('Error updating queue:', error);
    }
}

async function deleteItem(index) {
    try{
        const response = await fetch(`/delete_from_queue/${index}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Item deleted successfully!');
            updateQueue(); 
        } else {
            console.error('Failed to delete item from queue');
        }
    } catch (error) {
        console.error('Error deleting item from queue:', error);
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

