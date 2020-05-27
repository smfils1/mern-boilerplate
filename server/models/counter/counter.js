const mongoose = require("mongoose");

const counterSchema = mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    capped: { size: 1024, max: 1 }, //Allow only one count
  }
);

const Counter = mongoose.model("Counter", counterSchema);
const db = mongoose.connection;
db.once("open", async () => {
  if ((await Counter.countDocuments()) > 0) return;
  await Counter.create({});
});

module.exports = Counter;
