const adminAuth=(req,res,next)=>{
    console.log("admin authorization getting checked");
    const token="xyz";
    const isAdminAuth=token==="xyz";
    if(!isAdminAuth){
        res.status(500).send("unauthorized admin request");
    }
    else{
        next();
    }
    
}
const userAuth=(req,res,next)=>{
    console.log("admin authorization getting checked");
    const token="abc";
    const isUserAuth=token==="abc";
    if(!isUserAuth){
        res.status(500).send("unauthorized user request");
    }
    else{
        next();
    }
    
}
module.exports={
    adminAuth,
    userAuth
}