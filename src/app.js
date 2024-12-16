const express=require('express');
const app=express();
app.use((req,res)=>{
    res.send("server dashbaord");
})
app.use("/hello",(req,res)=>{
    res.send("hello hello");
})
app.use("/wah",(req,res)=>{
    res.send("good to go");
})

    

app.listen(7777,() => {
    console.log("server is successfull listening on port 7777");
    
})