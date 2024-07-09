import express from "express";
import { OTPVerification, loginController, signupController } from "../Controller/authController.js";
import { informationController } from "../Controller/informController.js";
import {createPostController, deletePostController, getPostController, getPostOwnerController, getownPostController, updatePostController} from "../Controller/postController.js";
import { deleteAccountController, getUserController, updatePasswordController, updateUserNameController } from "../Controller/userController.js";

const route = express.Router();

route.post("/api/signup", signupController);
route.post("/api/login", loginController);
route.post("/api/otpverify", OTPVerification);

route.get("/api/getuser",getUserController)
route.put("/api/updatename",updateUserNameController)
route.put("/api/updatepassword",updatePasswordController)
route.delete("/api/deleteaccount",deleteAccountController)

route.get("/api/getposts", informationController, getPostController)
route.post("/api/getpostowner", informationController, getPostOwnerController)
route.get("/api/getspecificpost/:id", getownPostController)
route.post("/api/createpost", informationController, createPostController)
route.put("/api/updatepost/:id", informationController, updatePostController)
route.delete("/api/deletepost/:id", informationController, deletePostController)

export default route

