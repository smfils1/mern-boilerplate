const bcrypt = require("bcrypt");
const { verifyToken } = require("../../utils/jwt");
const { JWT_SECRET } = require("../../config");

const methods = (userSchema) => {
  userSchema.methods.comparePassword = function (plainPassword) {
    const user = this;
    return bcrypt.compare(plainPassword, user.password);
  };

  userSchema.statics.validate = async function ({ email, password, error }) {
    const User = this;
    let user;
    try {
      const user = await User.findOne({ email });
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
};
module.exports = methods;
