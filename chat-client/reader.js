'use strict';

const fs = require('fs');
const util = require('util');

/********************************** Read A File **********************************/
const readWithCallBack = (file,callback)=>
{
  fs.readFile(file , (error,data)=>
  {
    if(error) {callback(error);}
    callback(undefined,data);
  });
};

let readFilepromisify = util.promisify(fs.readFile);

const readWithPromise = (file) =>
{
  return readFilepromisify(file)
    .then(file => JSON.parse(file.toString().trim()))
    .then(data => writeFile( file, data))
    .catch(error => console.error(error));
};

const writeFile = (file,data) =>
{

  let data2 = JSON.stringify(data);
  writeFilepromisify(file,data2);
  return data2;
};

module.exports = { readWithCallBack , readWithPromise ,writeFile };