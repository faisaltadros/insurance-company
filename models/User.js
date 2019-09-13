const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
