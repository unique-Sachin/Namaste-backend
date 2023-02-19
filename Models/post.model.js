const mongoose = require("mongoose");

const schema = mongoose.Schema({
  user: { type: String },
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

const PostModel = mongoose.model("namastePost", schema);

module.exports = {
  PostModel,
};
