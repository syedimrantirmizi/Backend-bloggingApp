import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const OTPmodel = mongoose.model("otp", OTPSchema);
export default OTPmodel;
