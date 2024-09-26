import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
    team_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required:true,
    },
    user_account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

const teamMember = mongoose.model('Team_Member',teamMemberSchema);


export default teamMember;