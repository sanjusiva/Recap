const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,unique:true},
    cust_id:{type:Number,unique:true},
    psw:{type:String},
    token:{type:String},
})

module.exports=mongoose.model('customers',customerSchema)