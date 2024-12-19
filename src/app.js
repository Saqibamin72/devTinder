const express = require('express');
const app = express();
app.use("/user", (req,res, next)=>{
    console.log("handing route user1");
    // res.send("response 1")
    next();
    
},
(req,res,next)=>{
    console.log("hanlding route 2");
    // res.send("response 2")
    next();

},
(req,res)=>{
    console.log("hanlding route 3");
    res.send("response 3")
}
)



app.listen(7777, () => {
    console.log("server is successfull listening on port 7777");

}) 