const zlib=require('zlib')
const fs=require('fs')


//compress a file
const gzip=zlib.createGzip();
const input=fs.createReadStream('/home/asplap1238/nodejsRecap/files/testFile.json')
const output=fs.createWriteStream('/home/asplap1238/nodejsRecap/files/testFile.json.gz')
input.pipe(gzip).pipe(output);

//decompress a file
const unzip=zlib.createUnzip();
const decompInput=fs.createReadStream('/home/asplap1238/nodejsRecap/files/testFile.json.gz')
const decompOutput=fs.createWriteStream('/home/asplap1238/nodejsRecap/files/decompFile.json')
decompInput.pipe(unzip).pipe(decompOutput)

