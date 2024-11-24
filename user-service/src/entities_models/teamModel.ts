import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectId: {
    type: Number,
    required: true,
    unique: true
  },
}, { timestamps: true });

const Team = mongoose.model("Team", teamSchema);
export default Team;
