import mongoose from 'mongoose';

const requestSchema =new mongoose.Schema({
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true,
    },
    user_account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    isAccepted:{
        type:Boolean,
        default:false,
    }
})


const Requests = mongoose.model("Request",requestSchema);

export default Requests;