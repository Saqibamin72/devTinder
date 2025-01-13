const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // Current user's ID
    const toUserId = req.params.toUserId; // Target user's ID from params
    const status = req.params.status; // Status from params
    const allowedStatus = ["ignored", "interested"]; // Valid statuses

    // Check if the provided status is valid
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type: " + status,
      });
    }

    // Check if a connection request already exists
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId }, // Request from current user to target user
        { fromUserId: toUserId, toUserId: fromUserId }, // Request from target user to current user
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection request already exists",
      });
    }

    // Check if the target user exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).send("User not found");
    }

    // Create a new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    // Save the connection request to the database
    const data = await connectionRequest.save();

    // Respond with a success message
    res.json({
      message: `${req.user.firstName} has sent a ${status} request to ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;
