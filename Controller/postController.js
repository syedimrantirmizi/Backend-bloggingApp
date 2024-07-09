import jwt from "jsonwebtoken";
import Postmodel from "../models/PostSchema.js";
import { UserModel } from "../models/UserSchema.js";
import Likemodel from "../models/LikeSchema.js";

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
      status: false,
    });
  }
};
export const getPostOwnerController = async (request, response) => {
  try {
    const { _id } = request.body;
    const postOwner = await UserModel.findById(_id)
      .select("-password")
      .select("-userType")
      .select("-isVerified")
      .select("-__v");
    response.json({
      message: "hello",
      data: postOwner,
      status: true,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: obj,
      status: false,
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
      status: false,
    });
  }
};
export const createPostController = async (request, response) => {
  try {
    const { title, desc, userID } = request.body;
    const createRes = await Postmodel.create({
      postOwner: userID,
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
      status: false,
    });
  }
};
export const deletePostController = async (request, response) => {
  try {
    const { userID } = request.body;
    const postID = request.params.id;
    const deleteRes = await Postmodel.findById(postID);
    if (userID != deleteRes.postOwner) {
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
      status: false,
    });
  }
};
export const updatePostController = async (request, response) => {
  try {
    const { title, desc, userID } = request.body;
    const obj = {
      title,
      desc,
    };
    const postID = request.params.id;
    const checkRes = await Postmodel.findById(postID);
    if (userID != checkRes.postOwner) {
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
      status: false,
    });
  }
};
export const likePostController = async (request, response) => {
  try {
    const { postId, liked } = request.body;
    const userid = request.params.id;
    const obj = {
      postId: postId,
      userId: userid,
      liked: liked,
    };
    const likeRes = await Likemodel.create(obj);
    response.json({
      message: "post liked",
      data: likeRes,
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
export const checkLikesController = async (request, response) => {
  try {
    const { postId } = request.body;
    const userId = request.params.id;
    const checkLikeRes = await Likemodel.find({ userId, postId });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      data: checkLikeRes,
      status: false,
    });
  }
};
export const unlikePostController = async (request, response) => {
  try {
    const { id, liked } = request.body;
    const postId = request.params.id;
    const obj = {
      postId: postId,
    };
    const deleteRes = await Postmodel.create({ userId: id, postId: postID });
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
      status: false,
    });
  }
};
