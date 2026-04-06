const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    name:{
        type:String,
        length:50,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active",
        required:true,
    },
    role:{
        type:String,
        enum:["viewer","analyst","admin"],
        required:true,
        default:"viewer",
    }
},{timestamps:true})
module.exports=mongoose.model('User',userschema);