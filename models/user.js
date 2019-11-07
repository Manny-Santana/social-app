const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./post").schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: String,
    img: String,
    fName: String,
    lName: String,
    posts: [Post],
    friendPosts: [Post],
    friends: [String],
    location: String,
    interests: [String]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
