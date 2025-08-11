const userModel=require('../model/userModel')
const ProductModel=require("../model/productModel")
const jwt=require('jsonwebtoken');
//user Register Controller
const userRegisterController=async(req,res)=>{
try{ 
const { name,contact, email,password }=req.body;
 const isExist=await userModel.findOne({email})
 if(isExist){
    res.json({
        success:false,
        code:403,
        message:"This Email is Already Exist",
        isExist,
        error:true
    })
 }else{
    const data=new userModel({name,contact, email,password })
    const result=await data.save(); 
     res.json({
        success:true,
      code:201,
      message:"Register successfully!!",
      data:result,
      error:false
  })
 } 
}catch(err){
console.log(err);
res.json({
    success:false,
    code:500,
    message:"Internal Server Error!",
    data:'',
    error:true
})
} 
}
//user Login Controller
const userLoginController=async(req,res)=>{
 try{
    const {email,password}=req.body;
  const result=await  userModel.findOne({email,password})
   if(result){
    const token=jwt.sign({id:result?.email},process.env.JWT_SECRET,{expiresIn:"10h"})
    res.json({
        success:true,
        code:200,
        message:"Login Success!!",
        result,
        token,
        error:false
    })
   }else{
    res.json({
        success:false,
        code:404,
        message:"InvalId Credentials!",
        data:'',
        error:true
    })
   }
 }catch(err){
    console.log(err); 
    res.json({
        success:false,
        code:500,
        message:"Internal Server Error!",
        data:'',
        error:true
    })
 }
}

const addProductController=async(req,res)=>{
   const {name,price}=req.body
   let img=req.files.img
   if(!img){
    res.json({
        success:false,
        code:404,
        message:"Image is required",
        data:'',
        error:true
    })
   }
   img.mv("uploads/"+img.name,(err)=>{
    if(err){
        res.json({
            success:false,
            code:500,
            message:"Error during fill uploading",
            data:'',
            error:true
        })
    }
   })
   const data=new ProductModel({name,price,img:img.name})
   const result=await data.save()
    res.json({
        success:true,
        code:201,
        message:"Product add successful",
        result,
        error:false
    })
}

const getProductController=async(req,res)=>{
  const result=await ProductModel.find()
  res.json({
        success:true,
        code:200,
        message:"Product fetch successful",
        result,
        error:false
    })
}

const deleteProductController=async(req,res)=>{
    const _id=req.params._id
    const result= await ProductModel.deleteOne({_id})
    res.json({
        success:true,
        code:200,
        message:"Product Deleted",
        error:false,
        result
    })
}

const editProduct=async(req,res)=>{
    const id=req.params.id;
    const {name,price}=req.body;
    const img=req.files.img;
    if(!img){
        res.json({
            success:false,
            code:404,
            message:"Image required"
        })
    }
    img.mv("uploads/"+img.name,(err)=>{
        if(err){
            res.send({
                success:false,
            code:404,
            message:"Failed Uploading.."
            })
        }
    })

    const result=await ProductModel.updateOne({_id:id},{name,price,img:img.name})
    res.json({
        code:200,
        success:true,
        message:"Update success",
        error:false,
        result
    })


}

module.exports={
    userRegisterController,
    userLoginController,
    addProductController,
    getProductController,
    deleteProductController,
    editProduct
}