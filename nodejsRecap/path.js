const path = require('path');
let p='/home/asplap1238/nodejsRecap/files/testFile.json'
let file=path.basename(p)
console.log("file: ",file)
let fileName=path.basename(p,'.json')//ignore extension
console.log("fileName: ",fileName)
console.log(process.env.PATH);
console.log("split: ",process.env.PATH.split(path.delimiter));
console.log("extension: ",path.extname(p));