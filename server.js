const express=require('express');
const cors=require('cors');
const cookieparser=require('cookie-parser');
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})
app.get('/',(req,res)=>{
    res.send("welcome to backend server");
})
const dbconnect=require('./Config/database');
dbconnect();
const routes=require('./Routes/routes');
app.use('/api/v1',routes);