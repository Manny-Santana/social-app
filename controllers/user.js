// @ts-nocheck
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

//===============================
// SHOW ROUTE
//===============================

router.get("/:id", (req, res) => {
  //TODO: render the userHome.ejs and pass the current user's data to it. also set up this users route and controller in server js

  if (req.params.id === req.session.userID) {
    User.findById(req.session.userID, (err, foundUser) => {
      if (err) {
        res.send(
          '<h1> Could not find the User</h1> <a href="/" ><h2>Try Again </h2></a>'
        );
      } else {
        console.log(foundUser.img);
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

module.exports = router;
