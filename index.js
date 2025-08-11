const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const expressFileupload=require("express-fileupload")
const app=express();
const DataBaseConnect=require('./config/dbConnect')
const userRouter=require('./router/userRouter')
app.use(express.json());
app.use(expressFileupload())
app.use("/static",express.static('./uploads')) //file
DataBaseConnect()
app.use(cors());
dotenv.config();
app.use(userRouter)
app.listen(process.env.PORT || 9000,()=>{
    console.log(`Server runing on ${process.env.PORT}`);
    
})