const express = require("express");
const { PostModel } = require("../Models/post.model");
const jwt = require("jsonwebtoken");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, "masai", async (err, decoded) => {
      if (err) throw err;
      const postData = await PostModel.find({ user: decoded.userId });
      res.send(postData);
    });
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});
postRouter.post("/add", async (req, res) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    res.send({ msg: "new post added" });
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});
postRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "post updated" });
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});
postRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await PostModel.findByIdAndDelete({ _id: id });
    res.send("post deleted");
  } catch (error) {
    res.send({ msg: "something went wrong", error });
  }
});

module.exports = {
  postRouter,
};
