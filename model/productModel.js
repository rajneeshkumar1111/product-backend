const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    img:String,
})
const ProductModel=mongoose.model("Products",productSchema)

module.exports=ProductModel