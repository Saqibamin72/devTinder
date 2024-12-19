const express = require('express');


const app = express();

const {adminAuth,userAuth}=require("./middlewares/auth");
app.use("/admin",adminAuth);
//app.use("/user",userAuth);

app.get("/user/getAllData",userAuth,(req, res)=>{
    res.send("user data sent");
});

 app.get("/user/deleteData",userAuth,(req, res)=>{
        res.send("user data deleted");
    
});
app.post("/user/login",(req,res))


app.get("/admin/getAllData",(req, res)=>{
    res.send("admin data sent");

});
app.get("/admin/deleteAdminData",(req,res)=>{
    res.send("deleted Admin data");
})

app.listen(7777, () => {
    console.log("server is successfull listening on port 7777");

}) 