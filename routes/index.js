import express from "express";
import { OTPVerification, loginController, signupController } from "../Controller/authController.js";
import { informationController } from "../Controller/informController.js";
import {checkLikesController, createPostController, deletePostController, getPostController, getPostOwnerController, getownPostController, likePostController, unlikePostController, updatePostController} from "../Controller/postController.js";
import { deleteAccountController, getUserController, updatePasswordController, updateUserNameController } from "../Controller/userController.js";

const route = express.Router();

// authentication api
route.post("/api/signup", signupController);
route.post("/api/login", loginController);
route.post("/api/otpverify", OTPVerification);

// userdata apis
route.get("/api/getuser",getUserController)
route.put("/api/updatename",updateUserNameController)
route.put("/api/updatepassword",updatePasswordController)
route.delete("/api/deleteaccount",deleteAccountController)

// post APIS
route.get("/api/getposts", informationController, getPostController)
route.post("/api/getpostowner", informationController, getPostOwnerController)
route.get("/api/getspecificpost/:id", getownPostController)
route.post("/api/createpost", informationController, createPostController)
route.put("/api/updatepost/:id", informationController, updatePostController)
route.post("/api/deletepost/:id", informationController, deletePostController)
route.post("/api/likepost/:id", informationController, likePostController)
route.post("/api/checklikes/:id", informationController, checkLikesController)
route.post("/api/unlikepost/:id", informationController, unlikePostController)

export default route

