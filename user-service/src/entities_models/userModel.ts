import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    image:{
      type:String,
      default:null,
    },
    username: {
      type: String,
      required: true,
      maxlength: 64,
    },
    fullName: {
      type: String,
      maxlength: 64,
      default: null,
    },
    basedIn: {
      type: String,
      maxlength: 64,
      default: null,
    },
    password: {
      type: String,
      required: true,
      maxlength: 64,
    },
    jobTitle: {
      type: String,
      maxlength: 64,
      default: null,
    },
    phone: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      required: true,
      maxlength: 255,
      unique: true,
    },
    isProjectManager: {
      type: Boolean,
      default: false,
    },
    registrationTime: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
