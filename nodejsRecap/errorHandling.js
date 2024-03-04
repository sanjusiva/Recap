function asyncOperation(callback) {
    setTimeout(() => {
      const error = new Error('Async error');
      callback(error, null);
    }, 1000);
  }
  
  asyncOperation(funcCall)
  function funcCall(error, result) {//1st check for error
    if (error) {
      console.error('Async Error:', error.message);
      return;
    }
  
    console.log('Async Result:', result);
  };
  