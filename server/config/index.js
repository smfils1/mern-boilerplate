const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
