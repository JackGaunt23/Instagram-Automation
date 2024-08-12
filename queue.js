class VideoQueue{
    constructor() {
        this.queue = [];
    }

    enqueue(videoDetails){
        this.queue.push(videoDetails);
    }

    dequeue(){
        return this.queue.shift();
    }

    peek(){
        return this.queue[0];
    }

    isEmpty(){
        return this.queue.length === 0;
    }
}

module.exports = VideoQueue;