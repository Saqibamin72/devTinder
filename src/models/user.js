const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema
(
    {
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
   
   

}
);

//schema methods in mongoose
//dont use arrow fucntion use simple fucntions otherwise it will break
userSchema.methods.getJwt=async function(){
const user=this;
const token=await jwt.sign({_id:user._id},"Dev@Tinder790",{
    expiresIn:"7d",
});
 return token;
}

userSchema.methods.validatePassword=async function(passwordByUser){
const user=this;
const passwordHash=user.password;
const isPasswordValid=await bcrypt.compare(passwordByUser,passwordHash);
return isPasswordValid;
}
//const User=mongoose.model("User",userSchema);
//module.exports=User;
module.exports=mongoose.model("User",userSchema);

