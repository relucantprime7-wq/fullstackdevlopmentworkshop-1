const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', () => {
    console.log("Hello! Welcome to Node.js.");
});

eventEmitter.on('exit', () => {
    console.log("Exiting the program...");
});

eventEmitter.emit('greet');
eventEmitter.emit('exit');