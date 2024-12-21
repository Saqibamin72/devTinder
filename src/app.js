const express=require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
app.post("/signUp", async(req,res)=>{
   
    const user=new User({
        firstName:"irfan",
        lastName:"sheikh",
        emailId:"Sirfn@gmail.com",
        password:"aifal@123",
        _id: "8099821937983773",
    })
    try{ 

        await user.save();
        res.send("User added successfully");
    }
    catch(err){
        res.status(400).send("User not saved:"+err.message);
    }
   

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



