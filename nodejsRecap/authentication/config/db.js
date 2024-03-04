const mongoose = require('mongoose');

main()
.then((val)=>console.log("successfully connected to db"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/customer');
}