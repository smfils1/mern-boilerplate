const express = require("express");
const router = express.Router();

const Counter = require("../models/counter/counter");
const errorResponse = require("../utils/error");
const auth = require("../middleware/auth");

router.patch("/", auth, async (req, res) => {
  const { increment } = req.body;
  try {
    await Counter.updateOne({ $inc: { count: increment } });
    res.json({ message: "success" });
  } catch (err) {
    errorResponse(
      {
        name: "UpdateError",
        message: "There's an issue updating count",
      },
      res
    );
  }
});
router.get("/", async (req, res) => {
  try {
    const { count } = await Counter.findOne();
    res.json({ count });
  } catch (err) {
    errorResponse(
      {
        name: "GetError",
        message: "There's an issue getting count",
      },
      res
    );
  }
});
module.exports = router;
