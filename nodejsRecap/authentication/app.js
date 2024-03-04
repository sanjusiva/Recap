require("./config/db");
require('dotenv').config()
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const Customer = require("./model/customers");
const express = require("express");
const app = express();
app.use(express.json());


const secretKey = process.env.KEY;
const auth = require("./middleware/auth");

app.get("/welcome", auth, (req, res) => {
    console.log("req: ",req.customer)
    let text=`Welcome,your id is ${req.customer.customer_id}`
  res.status(200).send(text);
});


app.post("/signup", async(req, res) => {
  try {
    const { name, email, cust_id, psw } = req.body;
    console.log("req: ", req.body);
    const oldCust =await Customer.findOne({ email });
    console.log("old: ",oldCust)
    if (oldCust) {
      res.send("You are already registered.Please login");
    } else {
      const encryptPsw = await bcrypt.hash(psw, 10);
      const data = Customer.create({
        name: name,
        email: email,
        cust_id: cust_id,
        psw: encryptPsw,
      });
      const tokenVal = jwt.sign(
        {
          customer_id: cust_id,
          email,
        },
        secretKey
      );
      data.token = tokenVal;
      res.status(201).json(data);
    }
  } catch (err) {
    console.log("ERR: ", err);
  }
});

app.post("/login", async(req, res) => {
    try {
        const { email, psw,cust_id } = req.body;
    
        const data = await Customer.findOne({ cust_id });
    
        if (data && (await bcrypt.compare(psw, data.psw))) {
          const tokenVal = jwt.sign(
            { customer_id: cust_id, email },
            secretKey
          );
    
          data.token = tokenVal;
    
          return res.status(200).json(data);
        }
        return res.status(400).send("Invalid Credentials");
    }
    catch(err){
        console.log("ERR: ",err)
    }

});

module.exports = app;
