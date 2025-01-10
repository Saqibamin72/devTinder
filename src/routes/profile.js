const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const{validateEditData}=require("../utils/validation");
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
   const user=req.user;    
    res.send(user);
}
    catch(err){
        res.status(400).send("ERROR:"+err.message);
       }
    
    
 });
 profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
try 
{

    if(!validateEditData){
        throw new Error("invalid Edit request");
    }
    const LoggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>(LoggedInUser[key]=req.body[key]));
    await LoggedInUser.save();
    res.json({
        message:`${LoggedInUser.firstName },"your profile is updated"`
    },
data=LoggedInUser);
  
}
catch(err)
{
res.status(400).send("Error"+err.message);

}


});
 module.exports=profileRouter;