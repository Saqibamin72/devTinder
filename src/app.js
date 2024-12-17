const express = require('express');
const app = express();
app.get("/user", (req, res) => {
    res.send({ firstname: "saqib", lastname: "amin" });

});
app.get("/user/:usedId/:name/:password", (req, res) => {
    console.log(req.params);
    
    res.send({ firstname: "saqib", lastname: "amin" });

});
app.post("/user", (req, res) => {
    res.send("data successfully posted on DB")
})
app.delete("/user",(req, res)=>{
    res.send("deleted successfully");
});
app.get("/ab*cd",(req,res)=>{
    res.send("abc exact");
});


app.listen(7777, () => {
    console.log("server is successfull listening on port 7777");

})