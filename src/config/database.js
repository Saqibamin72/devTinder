const mongoose=require('mongoose');
const connectDB= async()=>{
    await mongoose.connect(process.env.DB-CONNECTION_SECRET);
}
module.exports=connectDB;
