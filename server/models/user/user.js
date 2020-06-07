const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const isLocal = function () {
  return this.method === "local";
};
const isGoogle = function () {
  return this.method === "google";
};
const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    required: true,
  },
  local: {
    name: {
      type: String,
      required: [isLocal, "{PATH} is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [isLocal, "{PATH} is required"],
    },
    password: {
      type: String,
      minlength: [5, "{PATH} must be >= 5 characters"],
      required: [isLocal, "{PATH} is required"],
    },
  },
  google: {
    oauthId: {
      type: String,
      required: [isGoogle, "{PATH} is required"],
    },
    name: {
      type: String,
      required: [isGoogle, "{PATH} is required"],
    },
    gmail: {
      type: String,
      trim: true,
      unique: true,
      required: [isGoogle, "{PATH} is required"],
    },
  },
});
userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

const saltRounds = 10;
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("local.password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.local.password, salt, (err, hashedPassword) => {
        if (err) return next(err);
        user.local.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

require("./methods")(userSchema);

const User = mongoose.model("User", userSchema);
module.exports = User;
