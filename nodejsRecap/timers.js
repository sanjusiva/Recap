console.log('Start of script');//1

setTimeout(() => {
  console.log('SetTimeout');//4
});

setImmediate(() => {
  console.log('SetImmediate');//5
});
//if setInterval time gap is zero(default),then setInterval is caaled before setImmediate
setInterval(() => {
  console.log('SetInterval');//6
},10000);

process.nextTick(() => {
  console.log('nextTick');//3
});

console.log('End of script');//2