const jwt=require('jsonwebtoken')
const verifyToken=async(req,res,next)=>{
   const token =await req.headers.authorization.split(" ")[1];
//    console.log(token);
   jwt.verify(token,`${process.env.JWT_SECRET}`,(err)=>{
    if (err) {
        res.send({
            success : false,
            code : 401,
            message : "Token invalid"
        })
    }else{
        next();
    }
})
}
module.exports={verifyToken};