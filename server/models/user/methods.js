const bcrypt = require("bcrypt");
const ObjectID = require("mongodb").ObjectID;

const methods = (userSchema) => {
  userSchema.methods.comparePassword = function (plainPassword) {
    const user = this;

    return bcrypt.compare(plainPassword, user.local.password);
  };

  userSchema.statics.validate = async function ({
    local: { email, password },
    error,
  }) {
    const User = this;
    let user;
    try {
      user = await User.findOne({ "local.email": email });
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
      user.local.password = password;
      await user.save();

      if (!user) throw error;
      return user;
    } catch (err) {
      throw error || err;
    }
  };

  //Google
  userSchema.statics.findOrCreate = async function (
    { id: oauthId, displayName: name, _json: { email: gmail } },
    error
  ) {
    const User = this;
    let user;
    try {
      user = await User.findOne({ "google.oauthId": oauthId });
      if (!user) {
        user = User.create({
          method: "google",
          google: {
            oauthId,
            name,
            gmail,
          },
        });
      }
      return user;
    } catch (err) {
      error(err);
    }
  };
};

module.exports = methods;
