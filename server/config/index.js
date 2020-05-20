const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  WEBSITE: process.env.WEBSITE,
  EMAIL: process.env.EMAIL,
  EMAIL_RESET_SECRET: process.env.EMAIL_RESET_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
