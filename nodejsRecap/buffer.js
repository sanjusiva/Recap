const buff=Buffer.alloc(3)
buff.write('bad')
console.log("initial: ",buff.toString())
console.log("initial: ",buff)
console.log("initial: ",buff[0])
buff[0]=109
console.log("later: ",buff.toString())
