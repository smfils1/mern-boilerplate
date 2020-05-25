const bcrypt = require("bcrypt");
const ObjectID = require("mongodb").ObjectID;

const methods = (userSchema) => {
  userSchema.methods.comparePassword = function (plainPassword) {
    const user = this;
    return bcrypt.compare(plainPassword, user.password);
  };

  userSchema.statics.validate = async function ({ email, password, error }) {
    const User = this;
    let user;

    try {
      user = await User.findOne({ email });
      if (!user) throw error;

      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) {
        return user;
      } else {
        throw error;
      }
    } catch (err) {
      throw err;
    }
  };

  userSchema.statics.create = async function (userInfo, error) {
    const User = this;
    const user = new User(userInfo);

    try {
      const createdUser = await user.save();
      return createdUser;
    } catch (err) {
      throw error || err;
    }
  };

  userSchema.statics.updatePasswordById = async function (
    { id, password },
    error
  ) {
    const User = this;
    try {
      const user = await User.findById({ _id: id });
      user.password = password;
      await user.save();

      if (!user) throw error;
      return user;
    } catch (err) {
      throw error || err;
    }
  };

  userSchema.statics.incrementCounter = async function (counter, error) {
    const User = this;
    try {
      await User.updateMany({ counter: { $gte: 0 } }, { $inc: { counter } });
    } catch (err) {
      throw error || err;
    }
  };

  userSchema.statics.counter = async function (error) {
    const User = this;
    try {
      const user = await User.findOne({ counter: { $gte: 0 } });
      return user ? user.counter : 0;
    } catch (err) {
      throw error || err;
    }
  };
};
module.exports = methods;
