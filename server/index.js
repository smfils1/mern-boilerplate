const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");

//Socket Setup
const server = require("./socket")(app);

//Configurations
const config = require("./config");
const dbConnect = require("./config/db");
const passport = require("./config/passport");

// routes
const authRoutes = require("./routes/auth");
const googleAuthRoutes = require("./routes/googleAuth");
const historyRoutes = require("./routes/history");
const counterRoutes = require("./routes/counter");
const userRoutes = require("./routes/users");
const auth = require("./middleware/auth");

//Use Middlewares
app.use(
  cors({
    origin: config.WEBSITE_URL,
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use Routes
app.get("/test", (req, res) => {
  res.redirect("https://www.google.com/");
});
app.use("/api/auth", authRoutes);
app.use("/api/auth/google", googleAuthRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/history", auth, historyRoutes);
app.use("/api/counter", counterRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}
// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
//   dbConnect();
// });

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
