const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const USER_SAFE_DATA=["firstName","lastName","skills","age","gender"];


// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserID",USER_SAFE_DATA);
    //.populate("fromUserId", ["firstName", "lastName"]);
   //populate("fromUserId" ,"firstName lastName Skills");

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    req.status(400).send("ERROR: " + err.message);
  }
});


module.exports=userRouter;