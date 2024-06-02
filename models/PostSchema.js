import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
  },
  postOwner : {
    type : String,
    required : true,
  },
  desc : {
    type : String,
    required : true,
  },
});

const Postmodel = mongoose.model("post", PostSchema);
export default Postmodel;
