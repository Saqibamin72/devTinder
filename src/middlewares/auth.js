const adminAuth=(req, res,next)=>{
    console.log("Admin authorization getting checked");
    const token='xyz';
    const isAdminAuth=token==="xyz";
    if(!isAdminAuth){
        res.status(500).send("Unauthorized Admin request");
    }
    else{
        next();
    }
    

};
const userAuth=(req, res, next )=>{
    console.log("User Authorization getting  checked");
    const token="abc";
    const isUserAuth=token==="abc";
    if(!isUserAuth){
        res.status(500).send("Unauthorized User Request")
    }
    else{
        next();
    }
};
module.exports={
    adminAuth,
    userAuth
};