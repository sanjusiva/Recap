function calculateSum(n, callback) {
    let i;
    let sum = 0;
    for (i = 1; i <= n; i++) { 
      sum += i;
    }
    console.log(`Sum is: ${sum}`);
    callback(sum);
  }
  
  let n = 10;
  calculateSum(n,print);
  calculateSum(n,display);
  
  function print(sum){
    console.log(`Average is: ${sum/n}`);
  }

  async function display(sum){
    let greet=await eatSomeTime()
    console.log(`Display: ${greet}`);
  }

  function eatSomeTime(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("thanks for waiting")
            resolve('good')
        },2000)
    })
  }