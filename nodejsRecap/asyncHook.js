const async_hooks = require('async_hooks');

const trackedIds = new Set();

const asyncHook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    trackedIds.add(asyncId);

    console.log(`Init: asyncId ${asyncId} of type ${type},triggerAsyncId : ${triggerAsyncId},resource : ${resource}`);
  },
//   before(asyncId) {
//     console.log(`Before: asyncId ${asyncId}`);
//   },
//   after(asyncId) {
//     console.log(`After: asyncId ${asyncId}`);
//   },
  destroy(asyncId) {
    trackedIds.delete(asyncId);

    console.log(`Destroy: asyncId ${asyncId}`);
  },
});


const asyncOperation = () => new Promise((resolve) => {
    console.log('Async operation started');
  setTimeout(() => {
    console.log('Async operation completed');
    asyncHook.enable();
    resolve();
  }, 1000);
});

asyncOperation().then(() => {
  asyncHook.disable();
  console.log('Async hook disabled');
});
