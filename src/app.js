const express=require("express");
const connectDB=require("./config/database");

const{userAuth}=require("./middlewares/auth");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const app=express();
const User=require("./models/user");
const cookieParser= require("cookie-parser");
const jwt=require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());


app.post("/signUp", async(req,res)=>{
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
         await user.save();
         res.send("user saved successfully")
        
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
    }
});
 //login
 app.post("/login",async(req,res)=>{
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
    res.send("login successfully");

}
else{
    throw new Error("Invalid password")
}

   }
   catch(err){
    res.status(400).send("ERROR:"+err.message);
   }

 })

 app.get("/profile",userAuth,async(req,res)=>{
    try{
   const user=req.user;    
    res.send(user);
}
    catch(err){
        res.status(400).send("ERROR:"+err.message);
       }
    
    
 })
//sendconnection API
app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("connection request");
    res.send(user.firstName+" :send connection request");
    
});



connectDB()
.then(()=>{
    console.log("Database connection eastablished");
    app.listen(7777,()=>{
        console.log("server is listening at port 7777");
        
    });
    
})
.catch((err)=>{
    console.error("Database connection not established")

});



