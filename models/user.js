const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

const saltRounds = 10;

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        if (err) return next(err);
        user.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  const user = this;
  return bcrypt.compare(plainPassword, user.password);
};

userSchema.methods.generateJWT = async function () {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), "secret");
  user.token = token;
  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.validate = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) throw "Invalid Login";
    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch) {
      return user;
    } else {
      throw "Invalid Login";
    }
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
