const User=require('../Models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require("dotenv").config();
exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"No User Found",
                success:false,
            })
        }
        const match=await bcrypt.compare(password,user.password);
        
        if(!match){
            return res.status(401).json({
                message:"Wrong Password",
                success:false,
            })
        }
        const payload={email:user.email,role:user.role,id:user._id};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        return res.cookie("token",token,options).status(200).json({
            message:"User Logged In Successfully",
            success:true,
            user:payload,
        })
    }catch(error){
        console.log("Login Error: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.signup=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        if(!name || !email || !password || !role ){
            return res.status(400).json({
                message:"Please provide all details",
                success:false,
            })
        }
        const existinguser=await User.findOne({email});
        if(existinguser){
            return res.status(400).json({
                message:"User already exists",
                success:false,
            })
        }

        const hashedpass=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedpass,role});
        const payload={email:user.email,role:user.role,id:user._id};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        return res.cookie("token",token,options).status(201).json({
            message:"User Logged In Successfully",
            success:true,
            user:payload,
        })
    }catch(error){
        console.log("Signup Error: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}