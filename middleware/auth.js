const User = require("../models/user");

const auth = (req, res, next) => {
  //Get cookies
  const token = req.cookies.jwt_auth;
  try {
    //Verify token
    const signedUserId = User.verifyJWT(token);

    //Add User to payload
    req.userId = signedUserId;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

module.exports = auth;
