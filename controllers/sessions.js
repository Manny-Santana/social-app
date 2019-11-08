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

  //TODO: currently just sends the body.. UPDATE: have it create the user and reroute to user show page
  res.send(req.body);
});

//=============END CREATE USER ======

module.exports = router;
