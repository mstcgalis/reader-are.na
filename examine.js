// // import File System
const fs = require('fs');
// Import Are.na library
const Arena = require("are.na");
// read the data.json file
const fileContents = fs.readFileSync('./data.json');
// parse the contents into a JavaScript object
const data = JSON.parse(fileContents);

const arena = new Arena();

arena
  .channel("reading-msf15s-pp2o")
  .get()
  .then(chan => {console.log(chan.);})
  .catch(err => console.log(err));