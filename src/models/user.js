const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema
({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
        
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
        lowerCase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email id");
            }
        }
    },
    password:{
        type:String
    },
   
    skills:{
        type:[String],
    }
   
   

});
//const User=mongoose.model("User",userSchema);
//module.exports=User;
module.exports=mongoose.model("User",userSchema);

