const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    creatorID: String,
    creatorName: String,
    creatorImg: String,
    content: String,
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
