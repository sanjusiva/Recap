const http=require('http')
const app=require('./app')
const server=http.createServer(app)
const port=4000
require('dotenv').config()
console.log("env: ",process.env.port)
server.listen(port,()=>{
    console.log("Listening to port ",port)
}
)