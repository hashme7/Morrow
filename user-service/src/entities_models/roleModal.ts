import mongoose from 'mongoose';
const roleSchema = new mongoose.Schema({
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true,
    },
    role:{
        type:String,
        enum:['Developer','TeamLead','ProjectManager'],
        default:'Developer',
    },
    user_account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})
const Roles = mongoose.model("Roles",roleSchema);
export default Roles