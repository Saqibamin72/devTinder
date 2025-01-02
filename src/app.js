const express=require("express");
const connectDB=require("./config/database");


const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const app=express();
const User=require("./models/user");
app.use(express.json());
app.post("/signUp", async(req,res)=>{
 

    try{ 
        //validation of data 
        validateSignUpData(req);
        //encrypt password using hash (use npm i bcrypt)
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
        //create instance of new User
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        })
         
        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("User not saved:"+err.message);
    }
});
   


//Login APi with Authentication
app.post("/login",async(req,res)=>{
try{
const{emailId,password}=req.body;
const user=await User.findOne({emailId: emailId});
if(!user){
    throw new Error("Email id not present in DB");
}
const isPasswordValid=await bcrypt.compare(password,user.password);
if(isPasswordValid){
    res.send("logged successfully");
}
else{
    throw new Error("password not correct");
}
}
catch(err){
    res.status(400).send("ERROR:"+err.message);
}
});





//Get One user using find
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        //const users=await users.find(emailId:req.body.emailId);S
        const users=await User.find({emailId:userEmail});
        if(users.length===0){
            res.status(404).send("User not found");
          }
        else
        {
            res.send(users)
        }
    }catch(err){
        res.status.send("Something went Wrong");
    }
});



// Get all Users using find
app.get("/feed",async(req,res)=>{
    
    try {
        const users=await User.find({});
        res.send(users)
     }
      catch (error) {
        res.status.send("Something went Wrong");
    }
});



//Get Api using findOne if two users have same emailId
app.get("/user2",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        
        const user=await User.findOne({emailId:userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
         

    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})



//Delete user API

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        //await User.findByIdAndDelete({-id: userId});
        await User.findByIdAndDelete(userId);
        res.send("user deleted Successfully");
    }
    catch(err){
        res.status(404).send("Something went wrong");
    }
})




//update UserAPI
app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data );
        res.send("User updated Successfully");
    }
    catch(err){
        res.status(400).send("Somethig went wrong");
    }
})



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



