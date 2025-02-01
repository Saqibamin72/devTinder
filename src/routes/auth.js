const express=require("express");
const authRouter=express.Router();

const User=require("../models/user");
const {validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");
const user = require("../models/user");


authRouter.post("/signUp", async(req,res)=>{
    try{
         validateSignUpData(req);
         const{firstName,lastName,emailId,password}=req.body;
         const passwordHash=await bcrypt.hash(password,10);
         
         const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
         })
         const savedUser = await user.save();
         const token=await savedUser.getJwt();
 
  
   
   
  res.cookie("token",token,{
     expires:new Date(Date.now()+8*3600000)
  });
     
         res.json({ message: "User Added successfully!", data: savedUser });
        
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
});

 //login7
 authRouter.post("/login",async(req,res)=>{
    try{
 
     const{emailId,password}=req.body;
     const user=await User.findOne({emailId:emailId});
     if(!user){
         throw new Error("invalid credentials");
     }
     const isPasswordValid= await user.validatePassword(password);
 if(isPasswordValid){
 
  const token=await user.getJwt();
 
  
   
   
  res.cookie("token",token,{
     expires:new Date(Date.now()+8*3600000)
  });
     res.send(user);
 
 }
 else{
     throw new Error("Invalid password")
 }
 
    }
    catch(err){
     res.status(400).send("ERROR:"+err.message);
    }
 
  });

  //logout API
  
        
    

  authRouter.post("/logout", async (req, res) => {
    // Clear the token cookie
    res.cookie("token", null, {
        expires: new Date(Date.now()), // Expire the cookie immediately
        httpOnly: true, // Optional: Add security flag for HTTP-only cookies
    });

    // Assuming you extract the user from the request
    const user = req.user; // Replace this with the actual method to get the user

    res.json({
        message: `${user?.firstName || "User"}, logged out successfully`,
    });


  });



  module.exports=authRouter