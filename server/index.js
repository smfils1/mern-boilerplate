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

// routes
const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");
const counterRoutes = require("./routes/counter");
const userRoutes = require("./routes/users");
const auth = require("./middleware/auth");

let website;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../", "client", "build")));
  website = config.WEBSITE_URL;
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
} else {
  website = "http://localhost:3000";
}

//Use Middlewares
app.use(
  cors({
    origin: website,
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

// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
//   dbConnect();
// });

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
