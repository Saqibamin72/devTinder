const mongoose=require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        //index:true, putting index 
        

    },
    toUserId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
       // unique:true  putting index automatically,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect type `
        },

        
    },

},
{timeStamps:true},

);

//putting index in API
//connectionRequestSchema.index({fromUserId:1})
//compound index
connectionRequestSchema.index({fromUserId:1, toUserId:1});
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("Cannot send connection request to yourself!");
    }
    next();
  });




const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
  );
  
  module.exports = ConnectionRequestModel;
