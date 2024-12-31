const validator=require("validator");

const validateSignUpData=(req)=>{
const{firstName,lastName,emailId,password,}=req.body;
if(!firstName || !lastName){
    throw new Error("Name is not valid");
}
if(!validator.isEmail(emailId)){
    throw new Error("Email not valid");
}
if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password");
}
}
module.exports={
    validateSignUpData,
}
