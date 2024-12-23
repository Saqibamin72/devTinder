const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
app.use(express.json());
app.post("/signUp", async(req,res)=>{
 

    try{ 
        const user=new User(req.body);

        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("User not saved:"+err.message);
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



