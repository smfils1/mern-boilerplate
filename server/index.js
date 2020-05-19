const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const config = require("./config");
const dbConnect = require("./config/db");
const User = require("./models/user/user");
const auth = require("./middleware/auth");
const errorResponse = require("./utils/error");
const { generateToken } = require("./utils/jwt");

app.use(cors());
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user", auth, (req, res) => {
  res.json({ id: req.userId });
});

app.post("/api/users/signup", async (req, res) => {
  const userInfo = req.body;
  try {
    const createdUser = await User.create(userInfo);
    res.status(200).json({ message: "success" });
  } catch (err) {
    errorResponse(err, res);
  }
});

app.post("/api/users/login", async (req, res) => {
  const loginInfo = req.body;

  try {
    //Validate credentials
    const user = await User.validate({
      ...loginInfo,
      error: {
        name: "CredentialsError",
        message: "Invalid Login",
      },
    });
    // Send credential cookie
    const token = generateToken(user._id.toHexString());
    res
      .cookie("jwt_auth", token, {
        maxAge: 3600, //1 hour
        httpOnly: true,
        sameSite: true,
        secure: config.NODE_ENV === "production",
      })
      .status(200)
      .json({
        message: "success",
      });
  } catch (err) {
    errorResponse(err, res);
  }
});
console.log(config.PORT);
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
