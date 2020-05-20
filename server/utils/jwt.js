const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = ({ id, errorMessage, secret }) => {
  try {
    const token = jwt.sign({ id }, secret, { expiresIn: "1h" });
    return token;
  } catch (err) {
    throw errorMessage || err;
  }
};

verifyToken = (jwToken, errorMessage) => {
  try {
    const token = jwt.verify(jwToken, config.JWT_SECRET);
    return token.id;
  } catch (err) {
    throw errorMessage || err;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
