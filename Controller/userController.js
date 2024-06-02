import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserSchema.js";

export const getUserController = async (request, response) => {
  const token = request.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
  const userRes = await UserModel.findById(_id).select("-password").select("-userType").select("-isVerified").select("-__v");

  response.json({
    data: userRes,
    status: true,
  });
};
