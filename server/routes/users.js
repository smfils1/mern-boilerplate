const express = require("express");
const router = express.Router();

const User = require("../models/user/user");
const errorResponse = require("../utils/error");

router.get("/", async (req, res) => {
  try {
    //Get user by id
    const user = await User.findById({ _id: req.userId });

    res.json({
      name: user.local.name || user.google.name,
      email: user.local.email || user.google.gmail,
    });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
