import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxlength: 64
  },
  password: {
    type: String,
    required: true,
    maxlength: 64
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true
  },
  isProjectManager: {
    type: Boolean,
    default: false
  },
  registrationTime: {
    type: Date,
    default: Date.now
  },
  isVerified:{
    type:Boolean,
    default:false,
  }
}, {
  timestamps: true 
});

const User = mongoose.model("User", userSchema);

export default User;
