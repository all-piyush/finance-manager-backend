const Transaction=require('../Models/transaction');
const User=require('../Models/user');
exports.addtransction=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {amount,type,category,description}=req.body;
        if(!amount || !type || !category ){
            return res.status(400).json({
                success:false,
                message:"Enter all required details correctly"
            })
        }
        const newtransaction=await Transaction.create({userid,amount,type,category,description});
        return res.status(201).json({
            message:"Transaction Added Successfully",
            success:true,
            transaction:newtransaction,
        })
    }catch(error){
        console.log("Error While Creating Transaction: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.gettransactions=async(req,res)=>{
    try{
        const userid=req.user.id;
        const user=await User.findById(userid);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"USer Not Found In Database"
            })
        }
        const alltransactions=await Transaction.find({userid:userid});
        return res.status(200).json({
            message:"Transaction Fetched Successfully",
            success:true,
            transactions:alltransactions
        })
    }catch(error){
        console.log("Error While Fetching Transactions: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.updatetransaction=async(req,res)=>{
    try{
        const{amount,type,category,description}=req.body;
        const transactionid=req.params.id;
        const updated=await Transaction.findByIdAndUpdate(transactionid,{amount,type,category,description},{new:true});
        if(!updated){
            return res.status(404).json({
                success:false,
                message:"No Transaction Found"
            })
        }
        return res.status(200).json({
            message:"Transaction Updated Successfully",
            success:true,
            transaction:updated
        })
    }catch(error){
        console.log("Error While Updating Transaction: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.deletetransaction=async(req,res)=>{
    try{
        const transactionid=req.params.id;
        const deleted=await Transaction.findByIdAndDelete(transactionid);
        if(!deleted){
            return res.status(404).json({
                success:false,
                message:"No Transaction Found"
            })
        }
        return res.status(200).json({
            message:"Transaction Deleted Successfully",
            success:true,
        })
    }catch(error){
        console.log("Error While Deleting Transaction: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.transactionbydate=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {startdate,enddate}=req.body;
        const transactions=await Transaction.find({userid:userid,createdAt: {$gte: new Date(startdate),$lte: new Date(enddate)}});
        return res.status(200).json({
            message:"Transactions Fetched Successfully",
            success:true,
            transactions:transactions
        })
    }catch(error){
        console.log("Error While Fetching Transactions by Date: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.transactionbycategory=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {category}=req.body;
        const transactions=await Transaction.find({userid:userid,category:category});
        return res.status(200).json({
            message:"Transactions Fetched Successfully",
            success:true,
            transactions:transactions
        })
    }catch(error){
        console.log("Error While Fetching Transactions by Category: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.transactionbytype=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {type}=req.body;
        const transactions=await Transaction.find({userid:userid,type:type});
        return res.status(200).json({
            message:"Transactions Fetched Successfully",
            success:true,
            transactions:transactions
        })
    }catch(error){
        console.log("Error While Fetching Transactions by Type: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.transactionbydescription=async(req,res)=>{
    try{
        const userid=req.user.id;
        const {description}=req.body;
        const transactions=await Transaction.find({userid:userid,description:{$regex:description,$options: 'i'}});  
        return res.status(200).json({
            message:"Transactions Fetched Successfully",
            success:true,
            transactions:transactions
        })
    }catch(error){
        console.log("Error While Fetching Transactions by Description: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }

}