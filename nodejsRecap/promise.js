let p=new Promise((resolve,reject)=>{
    let num=Math.floor(Math.random() * 10);
    console.log("num: ",num)
    if(num!==0){
        resolve('true')
    }
    else{
        reject('false')
    }
   
}).then(()=>{
    console.log("succeed")
}).catch(()=>{
    console.log("failed")
}).finally(()=>{
    console.log("task ran")
})
