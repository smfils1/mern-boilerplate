const jwt = require("jsonwebtoken");

const generateToken = ({ id, errorMessage, secret }) => {
  try {
    const token = jwt.sign({ id }, secret, { expiresIn: "1h" });
    return token;
  } catch (err) {
    throw errorMessage || err;
  }
};

const verifyToken = ({ token, errorMessage, secret }) => {
  try {
    const jwToken = jwt.verify(token, secret);

    return jwToken.id;
  } catch (err) {
    throw errorMessage || err;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
