const express= require('express');
const userRouter=express.Router();
const {verifyToken}=require('../middleware/token')
const {userRegisterController,userLoginController,editProduct,addProductController,getProductController,deleteProductController}=require('../controller/userController')
userRouter.post('/register',userRegisterController);
userRouter.post('/login',userLoginController)
//
userRouter.post("/add-product",verifyToken,addProductController)
userRouter.get("/get-product",verifyToken,getProductController)
userRouter.delete("/delete-product/:_id",verifyToken,deleteProductController) 
userRouter.put('/edit-product/:id',verifyToken,editProduct)

module.exports=userRouter;