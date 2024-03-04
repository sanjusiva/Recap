const fs = require('node:fs');
fs.stat('/home/asplap1238/AWS_Trail/AWS-training.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.isFile()); // true
  console.log(stats.isDirectory()); // false
  console.log(stats.isSymbolicLink()); // false
  console.log(stats.size); //2484 bytes = 2.5kb
});

