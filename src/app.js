const express = require('express');



const app = express();
app.get("/getUserData",(req,res)=>{
    // try{
        //logic of Db calls and get user data
        throw new err("adasd");
        res.send("user data sent");

    // }
    // catch(err){
        res.status(500).send("Something went wrong");

    // }
});
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("some error contact us");
    }
});



app.listen(7777, () => {
    console.log("server is successfull listening on port 7777");

}) 