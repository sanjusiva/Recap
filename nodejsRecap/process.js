console.log(process.argv)
// command line : node process.js --params sanju kookie
// (process.argv[0]) is the path to the Node.js executable, 
// (process.argv[1]) is the path to the JavaScript file being executed, 
// and the remaining elements are the command-line arguments.
let msg="Hi all!"
process.stdout.write(msg+'\n')

// terminating nodejs process after 100ms
let count=0
setInterval(()=>{
    count++;
    if(count>10){
        process.exit()
    }
},100)

//used to run shell commands
let exec=require('child_process').exec
exec('cat process.js',(err,stdout,stderr)=>{
    console.log("comtent inside this file : ",stdout)
})