const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://sachin:sachin@cluster0.urwi6.mongodb.net/atlas?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};
