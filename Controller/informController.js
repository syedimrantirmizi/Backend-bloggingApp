import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserSchema.js";

export const informationController = async (request, response,next) => {
 const token = request.headers.authorization.split(" ")[1]
 const isverified = jwt.verify(token,process.env.JWT_PRIVATEKEY)
 if (isverified){
  next()
 } else { 
  response.status(401).json({
    message : "Unauthorized user"
  })
 }

};
