//async function returns promise

function youSecond(num){
    console.log("then me second");
    let sum=0
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("meee?")
        for(let i=0;i<num;i++){
            sum=sum+i;
        }
        resolve(sum);
        },2000)
    })
}

async function meFirst(){
    console.log("log me first");
    let res=await youSecond(5)  //awaits for a promise
    console.log("res: ",res)
}

meFirst();

const p = new Promise((resolve, reject) => {
    resolve(1);
  });
  
  async function asyncReturn() {
    return p;  //async function returns promise
  }
  
  function basicReturn() {
    return Promise.resolve(p);
  }
  
  console.log(p === basicReturn()); // true
  console.log(p === asyncReturn()); // false