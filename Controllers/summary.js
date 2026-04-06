const Transaction=require('../Models/transaction');
const mongoose=require('mongoose');
const User=require('../Models/user');
exports.summary=async(req,res)=>{
    try{
        const userid = new mongoose.Types.ObjectId(req.user.id);
        const totalincome=await Transaction.aggregate([
            {$match :{userid:userid,type:"income"}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ]);
        const totalexpense=await Transaction.aggregate([
            {$match :{userid:userid,type:"expense"}},
            {$group:{_id:null,total:{$sum:"$amount"}}}
        ])
        const netbalance=totalincome[0]?.total - totalexpense[0]?.total || 0;
        const cateogorytotal= await Transaction.aggregate([
            { $match: { userid: userid } },
            {$group: {_id: "$category",total: { $sum: "$amount" }}}
        ]);
        return res.status(200).json({
            message:"Summary Fetched Successfully",
            success:true,            
            summary:{
                totalincome:totalincome[0]?.total || 0,
                totalexpense:totalexpense[0]?.total || 0,
                netbalance:netbalance,
                categorytotals:cateogorytotal
            }
        });

    }catch(error){
        console.log("Error While Fetching Summary: ",error);
        return res.status(500).json({   
            message:"Internal Server Error",
            success:false,
        })
    }
}   
exports.summarybymonth=async(req,res)=>{
    try{
        const userid = new mongoose.Types.ObjectId(req.user.id);
        const {month,year}=req.body;
        const monthlyincome=await Transaction.aggregate([
            {$match :{userid:userid,type:"income",createdAt:{$gte:new Date(year,month-1,1),$lte:new Date(year,month,0)}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}        
        ]); 
        const monthlyexpense=await Transaction.aggregate([
            {$match :{userid:userid,type:"expense",createdAt:{$gte:new Date(year,month-1,1),$lte:new Date(year,month,0)}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}
        ]);
        const netbalance=monthlyincome[0]?.total - monthlyexpense[0]?.total || 0;
        return res.status(200).json({
            message:"Monthly Summary Fetched Successfully",
            success:true,
            summary:{
                monthlyincome:monthlyincome[0]?.total || 0,
                monthlyexpense:monthlyexpense[0]?.total || 0,
                netbalance:netbalance
            }
        });

    }catch(error){
        console.log("Error While Fetching Summary by Month: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    } 
}
exports.summarybyweek=async(req,res)=>{
    try{
        const userid = new mongoose.Types.ObjectId(req.user.id);
        const {week,month,year}=req.body;
        const startdate=new Date(year,month-1,(week-1)*7+1);
        const enddate=new Date(year,month-1,week*7);
        const weeklyincome=await Transaction.aggregate([
            {$match :{userid:userid,type:"income",createdAt:{$gte:startdate,$lte:enddate}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}

        ]);     
        const weeklyexpense=await Transaction.aggregate([
            {$match :{userid:userid,type:"expense",createdAt:{$gte:startdate,$lte:enddate}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}
        ]);
        const netbalance=weeklyincome[0]?.total - weeklyexpense[0]?.total || 0;
        return res.status(200).json({
            message:"Weekly Summary Fetched Successfully",
            success:true,
            summary:{
                weeklyincome:weeklyincome[0]?.total || 0,
                weeklyexpense:weeklyexpense[0]?.total || 0,
                netbalance:netbalance
            }
        });
    }catch(error){
        console.log("Error While Fetching Summary by Week: ",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
    }
}
exports.summarybydate=async(req,res)=>{
    try{
        const userid = new mongoose.Types.ObjectId(req.user.id);
        const {startdate,enddate}=req.body;
        const income=await Transaction.aggregate([
            {$match :{userid:userid,type:"income",createdAt:{$gte:new Date(startdate),$lte:new Date(enddate)}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}

        ]);
        const expense=await Transaction.aggregate([
            {$match :{userid:userid,type:"expense",createdAt:{$gte:new Date(startdate),$lte:new Date(enddate)}}},
            {$group:{_id:"null",total:{$sum:"$amount"}}}        

        ]);
        const netbalance=income[0]?.total - expense[0]?.total || 0;
        return res.status(200).json({   
            message:"Summary by Date Fetched Successfully",
            success:true,
            summary:{
                income:income[0]?.total || 0,
                expense:expense[0]?.total || 0,
                netbalance:netbalance
            }
        });
    }catch(error){
        console.log("Error While Fetching Summary by Date: ",error);
        return res.status(500).json({   
            message:"Internal Server Error",
            success:false,
        })
    }   
}