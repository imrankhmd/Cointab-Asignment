const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    wrongPasswordCount: { type: Number, default: 0 },
  },

  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
