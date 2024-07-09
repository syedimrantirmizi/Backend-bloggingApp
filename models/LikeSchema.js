import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  postId : {
    type : String,
    required : true,
  },
  userId : {
    type : String,
    required : true,
  },
  liked : {
    type : Boolean,
    required : true,
  },
});

const Likemodel = mongoose.model("likes", LikeSchema);
export default Likemodel;
