const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  WEBSITE_URL:
    process.env.NODE_ENV === "production"
      ? process.env.WEBSITE_URL
      : "http://localhost:3000",
  EMAIL: process.env.EMAIL,
  EMAIL_RESET_SECRET: process.env.EMAIL_RESET_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_DURATION: process.env.SESSION_DURATION,
  PORT: process.env.PORT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
