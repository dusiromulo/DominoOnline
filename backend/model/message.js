const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    string: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);