import jwt from "jsonwebtoken";
import Postmodel from "../models/PostSchema.js";
import { UserModel } from "../models/UserSchema.js";

export const getPostController = async (request, response) => {
  try {
    const obj = await Postmodel.find({});

    response.json({
      data: obj,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: obj,
      status: true,
    });
  }
};
export const getownPostController = async (request, response) => {
  try {
    const id = request.params.id;
    const obj = await Postmodel.find({ postOwner: id });

    response.json({
      data: obj,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: obj,
      status: true,
    });
  }
};
export const createPostController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token,process.env.JWT_PRIVATEKEY);
    const { title, desc } = request.body;
    const createRes = await Postmodel.create({
      postOwner: _id,
      title,
      desc,
    });
    response.json({
      message: "Post successfully created",
      data: createRes,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: true,
    });
  }
};
export const deletePostController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token,process.env.JWT_PRIVATEKEY);
    const postID = request.params.id;
    const deleteRes = await Postmodel.findById(postID);
    if (_id != deleteRes.postOwner) {
      response.status(403).json({
        message: "You are not the owner of this post",
        status: false,
        data: [],
      });
    }
    const postRes = await Postmodel.findByIdAndDelete(postID);
    response.json({
      message: "post Deleted",
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: true,
    });
  }
};
export const updatePostController = async (request, response) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const { _id } = jwt.verify(token,process.env.JWT_PRIVATEKEY);
    const { title, desc } = request.body;
    const obj = {
      title,
      desc,
    };
    const postID = request.params.id;
    const deleteRes = await Postmodel.findById(postID);
    if (_id != deleteRes.postOwner) {
      response.status(403).json({
        message: "You are not the owner of this post",
        status: false,
        data: [],
      });
    }
    const postRes = await Postmodel.findByIdAndUpdate(postID, obj);
    response.json({
      message: "post updated",
      data: postRes,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: [],
      status: true,
    });
  }
};
