const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    pic: {
      type: Buffer,
      required: false,
    },
    category: {
      type: String,
      default: "global",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
    type:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);
const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;
