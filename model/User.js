const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  status: {
    type: String,
    default: "non upgrade",
    enum: ["upgrade", "non upgrade"],
  },
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

module.exports = mongoose.model("User", Userschema);
