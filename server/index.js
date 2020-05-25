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
const authReset = require("./middleware/authReset");
const errorResponse = require("./utils/error");
const { generateToken } = require("./utils/jwt");
const { sendResetPasswordLink } = require("./services/email");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(helmet()); //Secure HTTP headers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user", auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    res.json({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    errorResponse(err, res);
  }
});

app.patch("/api/users", auth, async (req, res) => {
  const { counter } = req.body;
  try {
    if (counter) {
      await User.incrementCounter(counter, {
        name: "UpdateError",
        message: "There's an issue updating counter",
      });
      res.json({ message: "success" });
    } else {
      throw {
        name: "InvalidUpdateError",
        message: "Only updates to user's counter is allowed",
      };
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

app.get("/api/counter", async (req, res) => {
  try {
    const counter = await User.counter({
      name: "GetError",
      message: "There's an issue getting counter",
    });
    res.json({ counter });
  } catch (err) {
    errorResponse(err, res);
  }
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("jwt_auth").json({ message: "success" });
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
    const token = generateToken({
      id: user._id.toHexString(),
      secret: config.JWT_SECRET,
      errorMessage: null,
    });

    res
      .cookie("jwt_auth", token, {
        maxAge: 3600000, //1 hour
        httpOnly: true,
        // sameSite: true,
        secure: config.NODE_ENV === "production",
      })
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        counter: user.counter,
      });
  } catch (err) {
    errorResponse(err, res);
  }
});

app.post("/api/users/forgot", async (req, res) => {
  const loginInfo = req.body;

  try {
    //Check if user exists
    const user = await User.findOne({ email: loginInfo.email });
    if (!user)
      throw {
        name: "InvalidUserError",
        message: "User with this email don't exist",
      };

    // Send reset token
    const token = generateToken({
      id: user._id.toHexString(),
      secret: config.EMAIL_RESET_SECRET,
      errorMessage: null,
    });
    await sendResetPasswordLink({
      to: loginInfo.email,
      from: config.EMAIL,
      url: {
        link: `${config.WEBSITE}/api/users/reset/${token}`,
        time: "1 hour",
      },
    });
    res.json({
      message: "success",
    });
  } catch (err) {
    errorResponse(
      {
        name: "MailingError",
        message: "Unable to send email",
      },
      res
    );
  }
});

app.post("/api/users/reset/:token", authReset, async (req, res) => {
  const { newPassword } = req.body;
  const { userId } = req;
  try {
    // Need to update user password
    const updatedUser = await User.updatePasswordById({
      id: userId,
      password: newPassword,
    });

    res.json({
      message: "success",
    });
  } catch (err) {
    errorResponse(err, res);
  }
});
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  dbConnect();
});
