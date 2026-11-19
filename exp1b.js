const EventEmitter = require('events');

const button = new EventEmitter();

// Simulate button click event
button.on('click', () => {
    console.log("Button clicked!");
});

// Simulate button hover event
button.on('hover', () => {
    console.log("Mouse hovered over button!");
});

// Trigger events
button.emit('click');
button.emit('hover');