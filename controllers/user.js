// @ts-nocheck
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const PostModel = require("../models/post");

//===============================
// SHOW ROUTE
//===============================

router.get("/:id", (req, res) => {
  if (req.params.id === req.session.userID) {
    User.findById(req.session.userID, (err, foundUser) => {
      if (err) {
        res.send(
          '<h1> Could not find the User</h1> <a href="/" ><h2>Try Again </h2></a>'
        );
      } else {
        //redirect to self page view
        res.render("user/userHome.ejs", { User: foundUser });
      }
    });
  } else {
    User.findById(req.params.id, (err, foundUser) => {
      if (err) console.log(err.message);
      //render stranger page view
      res.render("user/userPage.ejs", { User: foundUser });
    });
  }
});

//===========================
// POST ROUTES
//===========================
//
//MAKE POST
//FIXME: update this route to check if its a friends page and update to friends posts accordingly
router.post("/:id/post", (req, res) => {
  //first verfiy that the current user is posting on their own page and add to their posts
  //otherwise add
  // the userpage should pass the friends id
  console.log("hit /user/id/post");
  if (req.params.id === req.session.userID && req.session.loggedin === true) {
    User.findById(req.session.userID, (err, User) => {
      if (err) console.log(err.message);
      //create post
      const Post = {};
      //pass in all requirements
      Post.creatorID = User._id;
      Post.creatorName = User.fName + " " + User.lName;
      Post.creatorImg = User.img;
      Post.content = req.body.post;
      PostModel.create(Post, (err, post) => {
        if (err) console.log(err.message);
        console.log("created the post in the current users object");
        console.log(post);
        User.posts.push(post);
        User.save();
      });

      res.redirect(`/user/${User._id}`);
    });
  } else {
    res.send("posting to a friends page is currently in development");
  }
});

module.exports = router;
