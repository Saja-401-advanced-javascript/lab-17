'user strict';

const net = require('net');
const fs = require('fs');
const util = require('util');

const client = new net.Socket();

const reader = ('./lib/reader.js');
client.connect(3001, 'localhost', () => { });

/***************************************** Read / Write File System **************************************************/
// FS File( read , write )
let file = `${__dirname}/../files/data.text`;

// Second Way to read a file with FS (Promisify)
let readFilepromisify = util.promisify(fs.readFile);

readFilepromisify(file)
  .then(data => {
    console.log('data in read  : ', data);
    console.log('data promisify : ', data.toString());
    return data.toString();
  })
  .then(data => writeFile(file, data))
  .catch(error => console.error('There is an error , promise', error));

// Third Way to read a file with FS (Promisify) & async function
async function readFileAsync(file) {
  try {
    let data = await readFilepromisify(file);
    console.log('data : ', data);
  }
  catch (error) {
    console.error('There is an error , async', error);
  }
}

readFileAsync(file);

let writeFilepromisify = util.promisify(fs.writeFile);

const writeFile = (file, data) => {
  data = data.toUpperCase();
  console.log('data in write function : ', data);
  writeFilepromisify(file, data);
  return data;
};

function sendEvent(quit) {
  const events = ['create', 'foo', 'read', 'baz', 'update', 'bing', 'rain', 'attack', 'error', 'bark', 'error'];
  let eventName = events[Math.floor(Math.random() * events.length)];
  let event = JSON.stringify({ event: eventName, payload: `${eventName} just happened!` });
  client.write(event, () => {
    if (quit) { client.end(); }
  });
}

sendEvent(true);

