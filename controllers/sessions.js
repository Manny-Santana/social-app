const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("user/login.ejs");
});

module.exports = router;
