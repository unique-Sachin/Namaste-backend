const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  pass: { type: String },
});

const UserModal = mongoose.model("namasteuser", schema);

module.exports = {
  UserModal,
};
