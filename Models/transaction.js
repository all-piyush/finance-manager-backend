const mongoose=require('mongoose');
const User=require('./user');
const transctionschema=new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        enum:["income","expense"],
        required:true,
    },
    category:{
        type:String,
        enum:["housing","transportation","entertainment","healthcare","education","savings","salary"],
        required:true,
    },
    description:{
        type:String,
    }
},{timestamps:true})
module.exports=mongoose.model('Transaction',transctionschema);