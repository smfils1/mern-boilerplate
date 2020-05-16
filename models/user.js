const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// userSchema.methods.comparePassword = function (plainPassword, callback) {
//   const user = this;
//   bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

// userSchema.methods.comparePassword = function (plainPassword) {
//   const user = this;
//   return bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
//     return new Promise((resolve, reject) => {
//       if (err) reject(new Error("Invalid Login"));
//       resolve(isMatch);
//     });
//   });
// };

userSchema.methods.comparePassword = function (plainPassword) {
  const user = this;
  return bcrypt.comdpare(plainPassword, user.password);
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

  // return bcrypt
  //   .compare(plainPassword, user.password)
  //   .then((isMatch) => {
  //     return new Promise((resolve) => {
  //       resolve(isMatch);
  //     });
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
