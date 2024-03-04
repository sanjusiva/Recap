const util = require('util');

function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = null; 
      const result = 'Hello, callback!';

    //   resolve(result);
      reject(error)
    }, 100);
  });
}

const callbackifiedAsyncFunction = util.callbackify(asyncFunction);

callbackifiedAsyncFunction((error, result) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  console.log(`Result: ${result}`);
});


const debug = util.debuglog('myapp');
debug('This is a debug message for "myapp" section.');
//use this in command line to print output :  NODE_DEBUG=myapp node util.js