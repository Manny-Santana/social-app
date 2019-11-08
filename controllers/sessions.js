// @ts-nocheck
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// POST ROUTES
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//=POST==================================
// CREATE USER
//===================================-===

router.post("/create", (req, res) => {
  //encrypt password
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  //create the user
  User.create(req.body, (err, createdUser) => {
    if (err) console.log(err.message); //handle the error
    console.log("created the following user in the db", createdUser);
    req.session.userID = createdUser._id;
    req.session.loggedin = true;
    console.log(
      "from sessions.js/create current session variables have been set",
      req.session
    );
    res.redirect(`/user/${createdUser._id}`);
  });

  //TODO: currently just sends the body.. UPDATE: have it create the user and reroute to user show page
});

//=============END CREATE USER ======

//=POST==================================
// LOGIN USER
//=======================================

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.send(
        '<a href="/session/signup"><h2>Please Register an Account</h2></a>'
      );
    } else {
      console.log(req.body);
      const password = req.body.password;
      const Pcomparison = bcrypt.compareSync(password, foundUser.password);
      console.log("password match: ", Pcomparison);
      if (Pcomparison) {
        req.session.userID = foundUser._id;
        req.session.loggedin = true;
        console.log(
          "from sessions.js current session variables have been set",
          req.session
        );

        res.redirect(`/user/${req.session.userID}`);
      } else {
        res.send("password did not match");
      }
    }
  });
});

module.exports = router;
