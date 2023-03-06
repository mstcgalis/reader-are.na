// import File System
const fs = require('fs');
// Import Are.na library
const Arena = require("are.na");

/**
 * Connects a connectable (block or channel) to a destination channel.
 * 
 * @param {*} destinationChan    The destination channel to connect the connectable to. 
 * @param {Object} connectableId    The ID of a connectable object (block or channel) to connect to the destination channel. 
 * @param {*} accessToken    The access token for the user.
 * @returns {boolean}    Returns true if the connection was successful, false if not.
 */
// TODO: test
const connect = (destinationChan, connectable, accessToken) => {
  return new Promise((resolve, reject) => {
    fetch("https://api.are.na/v2/channels/" + destinationChan.id + "/connections", {
      method: "POST",
			headers: {
        "Content-Type": "application/json",
				"Authorization": "Bearer " + accessToken
			},
			body: JSON.stringify({
        connectable_type: connectableType,
				connectable_id: connectableId
			})
		})
    .then(response => {
      if (!response.ok) {
        reject(new Error("Failed to connect, status: " + response.status));
        return false;
      }
      return true;
    })
	});
};i

/**
 * Gets a channel object from are.na, given the channel slug.
 * 
 * @param {string} slug    The slug of the channel to get (can be parsed from the channel URL)
 * @returns {Object}    Returns the channel object.
 */
// TODO: match the documentation
const getChannel = (slug) => {
  const arena = new Arena({accessToken: data.accessToken});
  return new Promise((resolve, reject) => {
    arena
      .channel(slug)
      .get()
      .then(channel => {
        resolve(channel);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Parses the file name to get the author, title, and year.
 * 
 * @param {string} fileName    The file name to parse.
 * @returns {Object}    Returns an object with the author, title, and year or null if the file name is not formatted correctly.
 */
// TODO: write from documentation

/**
 * Parses the highlights file to get the page number, highlight, and content for each highlight.
 * 
 * @param {string} filePath    The file path to parse.
 * @param {string} fileSchema    The file schema to parse.
 * @returns {Array}    Returns an array of objects with the page number, highlight, and content for each highlight.
 */
// TODO: write from documentation


/**
 * Creates a block on are.na connected to the book channel from each highlight in the highlights array.
 * 
 * @param {Object} bookChan    The book channel object.
 * @param {Array} highlights    The array of highlights to create blocks from.
 */
// TODO: write from documentation

// read the data.json file
const fileContents = fs.readFileSync('./data.json');
// parse the contents into a JavaScript object
const data = JSON.parse(fileContents);

// create a new instance of the Arena class
const arena = new Arena({accessToken: data.accessToken});

/*TODO: only try to the author, title, and year if the file name is formatted correctly
else try to get the author, title, and year from the JSON file */
// get the author name from the file name
let author = data.filePath.split(" - ")[0];
// get the title from the file name
let title = data.filePath.split(" - ")[1].split(" (")[0];
// get the year from the file name
let year = data.filePath.split(" (")[1].split(")")[0];
// create the book channel name
let bookChanName = `${author} / ${title} (${year})`;

// excerpts channel object
let excerptChan;
arena
  .channel(data.excerptChanSlug)
  .get()
  .then(channel => {excerptChan = channel;})
  .catch(error => {console.error(error);}
);

// bookshelf channel object
let bookshelfChan;
arena
  .channel(data.bookshelfChanSlug)
  .get()
  .then(channel => {bookshelfChan = channel;})
  .catch(error => {console.error(error);}
);

// TODO: create channel function?
// //FIXME: this shoudl wait until the bookshelf channel is created
// if (typeof bookshelfChan !== 'undefined') {
//   // create the book channel on are.na, then save the channel object to the bookChan variable, or log the error
//   let bookChan;
//   arena
//     .channel()
//     .create(bookChanName)
//     .then(chan => {
//       console.log("id:" + chan.slug)
//       bookChan = chan;
//       // connect the book channel to the bookshelf channel
//       connect(bookshelfChan, "Channel", chan, data.accessToken);
//     })
//     .catch(err => console.log(err))
//   ;
// };

// read the highlights file contents as a string
fs.readFile(data.filePath, 'utf-8', (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }

  // create the page variable
  let page = "";
  // create the highlight variable
  let highlight = "";
  // create the block variable
  let blockContent = {};
  // create the block object
  let blockObj;

  // parse the data as text, splitting at each line break
  const lines = contents.split(/\r?\n/);
  // loop though each line
  for (const item of lines) {
    // if line starts with "p. number", then its the page number
    if (item.startsWith("p. ")) {
      // save the page number into the page variable
      page = item.split("p. ")[1];
    // if line is not empty, then its a highlight
    } else if (item !== "") {
      // save the highlight into the highlight variable
      highlight = item;
      // addign the block object
      blockContent = {
        highlight,
        title: "",
        description: author + " / " + title + " (" + year + ")" + " / " + "p. " + page,
      };

      // prototype
      console.log(blockContent.highlight + "\n")

      // // add block to are.na, then get the block object, or log the error
      // arena
      //   .block()
      //   .create("excerpt-wbplimrst0", blockContent)
      //   .then(block => blockObj = block)
      //   .catch(err => console.log(err))
      // ;
      // // connect the block to the book channel
      // connect(bookChan, "Block", blockObj, contents.accessToken);
      // // connect the block to the excerpts channel
      // connect(excerptChan, "Block", blockObj, contents.accessToken);
    };
  };
});