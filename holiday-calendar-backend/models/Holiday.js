const mongoose = require("mongoose");

const HolidaySchema = new mongoose.Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
});

// Prevent OverwriteModelError
module.exports =
  mongoose.models.Holiday || mongoose.model("Holiday", HolidaySchema);
