import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  code: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: new Date(Date.now() + 5 * 60 * 1000),
    index: { expires: 0 },
  },
});


const VerificationCode = mongoose.model("Verification-Code",verificationCodeSchema);


export default VerificationCode;

