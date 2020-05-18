require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");

const User = require("./models/user");
const auth = require("./middleware/auth");

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user", auth, (req, res) => {
  res.json({ id: req.userId });
});

app.post("/api/users/signup", async (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);
  try {
    const createdUser = await user.save();
    res.status(200).json(createdUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        err,
      });
    }
    res.status(500).json({
      err,
    });
  }
});

app.post("/api/users/login", async (req, res) => {
  const loginInfo = req.body;
  try {
    //Validate credentials
    const user = await User.validate(loginInfo.email, loginInfo.password);

    // Send credential cookie
    const signedUser = await user.generateJWT();
    res.cookie("jwt_auth", signedUser.token, {
      maxAge: 3600, //1 hour
      httpOnly: true,
      sameSite: true,
      secure: NODE_ENV === "production",
    });
    res.cookie("jwt_auth", signedUser.token).status(200).json({
      signedUser,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
