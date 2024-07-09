import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
export const getUserController = async (request, response) => {
  const token = request.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
  const userRes = await UserModel.findById(_id)
    .select("-password")
    .select("-userType")
    .select("-isVerified")
    .select("-__v");

  response.json({
    data: userRes,
    status: true,
  });
};

export const updateUserNameController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    const { name } = request.body;
    if (!name) {
      response.status(400).json({
        message: "invalid name",
        data: [],
        status: false,
      });
    }
    const obj = { name };
    const userRes = await UserModel.findByIdAndUpdate(_id, obj);
    response.json({
      message: "user updated",
      data: userRes,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: false,
    });
  }
};
export const updatePasswordController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    const { oldpw, newpw } = request.body;
    if (!oldpw || !newpw) {
      response.status(400).json({
        message: "invalid name",
        data: [],
        status: false,
      });
    }
    const userRes = await UserModel.findById(_id);
    const comparePassword = await bcrypt.compare(oldpw, userRes.password);
    if (!comparePassword) {
      response.status(400).json({
        message: "wrong password",
        data: [],
        status: false,
      });
    }
    const hashPass = await bcrypt.hash(newpw, 10);
    const obj = { password: hashPass };
    const userResNew = await UserModel.findByIdAndUpdate(_id, obj);
    response.json({
      message: "password updated",
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: false,
    });
  }
};
export const deleteAccountController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    const postRes = await Postmodel.findAndDelete({ postOwner: _id });
    const userRes = await UserModel.findByIdAndDelete(_id);
    response.json({
      message: "user Deleted",
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: false,
    });
  }
};
