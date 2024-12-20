const mongoose= require("mongoose");
const connectDB= async()=>{
    mongoose.connect("mongodb+srv://saqibamin72:Me7zTamiQwvHzDJX@namastenodejs.gejrj.mongodb.net/devTinder")

};

module.exports=connectDB;