const fs = require('fs');

// CREATE
fs.writeFileSync('data.txt', 'Hello Node.js!');
console.log("File created.");

// READ
const data = fs.readFileSync('data.txt', 'utf8');
console.log("File content:", data);

// UPDATE
fs.appendFileSync('data.txt', '\nThis is updated content.');
console.log("File updated.");

// READ AGAIN
const updatedData = fs.readFileSync('data.txt', 'utf8');
console.log("Updated content:\n", updatedData);

// DELETE
fs.unlinkSync('data.txt');
console.log("File deleted.");