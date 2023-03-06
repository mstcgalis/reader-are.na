const fs = require('fs');

fs.readFile('./data.json', (err, data) => {
  if (err) throw err;

  // Parse the contents into a JavaScript object
  const jsonData = JSON.parse(data);

  // Do something with the parsed data
  console.log(jsonData.filePath);
});