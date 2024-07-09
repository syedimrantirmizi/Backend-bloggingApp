import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postOwner: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

const Postmodel = mongoose.model("post", PostSchema);
export default Postmodel;
