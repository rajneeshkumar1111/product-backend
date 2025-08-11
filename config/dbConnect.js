const mongoose=require('mongoose');

const DataBaseConnect=async()=>{
  const con=await mongoose.connect('mongodb://localhost:27017/mtdb');
  if(con){
    console.log('db connect !!!!!!!!!');
  }
  }

module.exports=DataBaseConnect;