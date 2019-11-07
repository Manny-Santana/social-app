// @ts-nocheck
const express = require("express");
const mongoose = require("mongoose");
const ENV = require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const dbURI = process.env.DB_URL;
const db = mongoose.connection;
const session = require("express-session");
const methodOverride = require("method-override");
const SECRET = process.env.SECRET;
const sessionController = require("./controllers/sessions.js");
const seed = require("./models/seed.js");
const User = require("./models/user.js");
const Post = require("./models/post.js");
const bcrypt = require("bcrypt");

//DB setup==================
//
//==========================
mongoose.connect(
  dbURI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to mongo...");
  }
);
mongoose.set("useCreateIndex", true);
//==========================
//MIDDLEWARE
//==========================
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//==========================
//root redirect to login page
//==========================
app.get("/", (req, res) => {
  console.log("hit login page...");
  res.render("user/home.ejs");
});

//==========================
//SEEEEEEEEEEEEDDDDSSS!!!!!!!
//==========================
app.get("/seed", (req, res) => {
  User.create(seed, (err, createdItem) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(createdItem);
      res.send(createdItem);
    }
  });
});

app.get("/seedPost", (req, res) => {
  User.findOne({ username: "FirstFriend" }, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      Post.create(
        {
          creatorID: data._id,
          creatorName: `${data.fName} ${data.lName}`,
          creatorImg: data.img,
          content: "This is my technically fifth post"
        },
        (err, item) => {
          if (err) console.log(err.message);
          data.posts.push(item);
          data.save();
          item.save();
          res.send(data);
        }
      );
    }
  });
});

//==========================
//ROUTE CONTROLLERS
//==========================
app.use("/user", sessionController);

//==========================
// LISTENER
//==========================
app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
});
