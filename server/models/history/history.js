const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    action: {
      type: String,
      default: "+1",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const History = mongoose.model("History", historySchema);
module.exports = History;
