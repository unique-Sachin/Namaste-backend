const express = require("express");
const { UserModal } = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const user = await UserModal.find({ email });
    if (user.length > 0) {
      res.send({ msg: "User already exist. Please login" });
    } else {
      bcrypt.hash(pass, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "something went wrong", err });
        }
        const newuser = new UserModal({ name, email, pass: hash });
        await newuser.save();
        res.send({ msg: "user is registered" });
      });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const loggedUser = await UserModal.find({ email });
    if (loggedUser.length > 0) {
      bcrypt.compare(pass, loggedUser[0].pass, function (err, result) {
        if (err) throw err;
        if (result) {
          const token = jwt.sign({ userId: loggedUser[0]._id }, "masai");
          res.send({ msg: "logged in", token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "User does not exist. Please register" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

module.exports = {
  userRouter,
};
