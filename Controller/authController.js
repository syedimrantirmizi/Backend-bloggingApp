import { UserModel } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Otptemplate } from "../templates/index.js";
import OTPmodel from "../models/OTPSchema.js";
import jwt from "jsonwebtoken";
export const signupController = async (request, response) => {
  try {
    const { name, email, password, phoneNumber } = request.body;
    if (!name || !email || !password || !phoneNumber) {
      response.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      response.status(400).json({
        message: "Email already exists",
        status: false,
      });
      return;
    }
    const hashPass = await bcrypt.hash(password, 10);
    const obj = {
      ...request.body,
      password: hashPass,
      userType: "user",
    };
    const userResponse = await UserModel.create(obj);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });
    const otp = Math.floor(100000 + Math.random() * 900000);
    await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Email Verification",
      html: Otptemplate(otp, name),
    });
    const otpObj = {
      email,
      otp,
    };
    await OTPmodel.create(otpObj);
    response.json({
      data: userResponse,
      status: true,
      message: "successfully signed up",
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      status: false,
      data: [],
    });
  }
};
export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(400).json({
        message: "Email does not exists",
        status: false,
      });
      return;
    }
    console.log(user.password, password)
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      response.status(400).json({
        message: "email or password invalid",
        status: false,
      });
      return;
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_PRIVATEKEY
    );
    response.json({
      data: user,
      status: true,
      message: "successfully logged in",
      token,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      status: false,
      data: [],
    });
  }
};
export const OTPVerification = async (request, response) => {
  try {
    const { otp, email } = request.body;
    if ( !email) {
      response.status(400).json({
        message: "No email found",
        status: false,
      });
      return;
    }
    if ( !otp) {
      response.status(400).json({
        message: "Required field missing",
        status: false,
      });
      return;
    }
    const otpRes = await OTPmodel.findOne({ email, otp });
    if (!otpRes) {
      response.status(400).json({
        message: "invalid OTP",
        status: false,
      });
      return;
    }
    if (otpRes.isUsed) {
      response.status(400).json({
        message: "invalid OTP",
        status: false,
      });
      return;
    }
    const usedRes = await OTPmodel.findByIdAndUpdate(otpRes._id, {
      isUsed: true,
    });
    const userRes = await UserModel.findOneAndUpdate(
      { email },
      {
        isVerified: true,
      }
    );
    response.json({
      message: "User Verified!",
      status: true,
      data: [],
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      status: false,
      data: [],
    });
  }
};
