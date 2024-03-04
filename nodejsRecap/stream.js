const http=require('http')
const fs=require('fs')
const server=http.createServer((req,res)=>{
    // fs.readFile('/home/asplap1238/nodejsRecap/files/testFile.json',(err,data)=>{
    //     res.end(data)
    // })
    const stream=fs.createReadStream('/home/asplap1238/nodejsRecap/files/testFile.json')
    stream.pipe(res)
})

server.listen(3000,()=>{
    console.log('app is running in port 3000')
})