const mongoose=require('mongoose')
const UserShema=new mongoose.Schema({
    name:String,
    contact:String,
    email:String,
    password:String
})

const userModel=mongoose.model("userTabls",UserShema)

module.exports=userModel;
