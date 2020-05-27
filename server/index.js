const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const config = require("./config");
const dbConnect = require("./config/db");

// routes
const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");
const counterRoutes = require("./routes/counter");
const userRoutes = require("./routes/users");
const auth = require("./middleware/auth");

const website =
  config.NODE_ENV === "production"
    ? config.WEBSITE_URL
    : "http://localhost:3000";
app.use(
  cors({
    origin: [website],
    credentials: true,
  })
);
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/history", auth, historyRoutes);
app.use("/api/counter", counterRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
