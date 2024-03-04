const event=require('node:events')
const eventEmitter = new event();

eventEmitter.on('start', () => {
    console.log('initiated');
  });

eventEmitter.emit('start');