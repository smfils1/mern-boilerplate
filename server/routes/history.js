const express = require("express");
const router = express.Router();

const History = require("../models/history/history");
const paginate = require("../middleware/paginate");

router.post("/", async (req, res) => {
  const { count } = req.body;

  try {
    await History.create({ user: req.userId, count });
    res.status(200).json({ message: "success" });
  } catch (err) {
    errorResponse(err, res);
  }
});

router.get("/", paginate(History, true), async (req, res) => {
  try {
    res.status(200).json({ history: res.paginatedResults });
  } catch (err) {
    errorResponse(err, res);
  }
});

module.exports = router;
