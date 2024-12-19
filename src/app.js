const express = require('express');
const app = express();
app.get("/user/:userId/:name/:password",(req, res)=>{
    console.log(req.params);
    res.send({firstname:"saqib",lastname:"dar"});
});


app.listen(7777, () => {
    console.log("server is successfull listening on port 7777");

}) 