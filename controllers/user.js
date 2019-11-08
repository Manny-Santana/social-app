const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/:id", (req, res) => {
  //TODO: render the userHome.ejs and pass the current user's data to it.
  if (req.params.id === req.session.userID) {
    res.render("/user/userHome.ejs");
  }
  User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log(err.message);
    res.send(foundUser);
  });
});
