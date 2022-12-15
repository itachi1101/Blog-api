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
    imagePath: {
      type: String,
      required: false,
    },
    category:
      [{
        type: String
      }]
    ,
    draft: {
      type: Boolean,
      default: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;