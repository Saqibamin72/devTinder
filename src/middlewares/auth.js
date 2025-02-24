const jwt=require("jsonwebtoken");
const User=require("../models/user")
const userAuth=async(req,res,next)=>{
 try{
    //const cookies=req.cookies;
   // const {token}=cookies;
   const{token}=req.cookies;
   if(!token){
    throw new Error("invalid token");
    }
   
    const decodedObj=await jwt.verify(token,process.env.JWT-SECRET-KEY);
    const{_id}=decodedObj;
   
    const user=await User.findById(_id);
    if(!user){
        throw new Error("user not found");
    }
    req.user=user;
    next();

 }
 catch(err){
    res.status(400).send("ERROR:"+err.message);
 }
};



module.exports={
  
    userAuth,
    
}