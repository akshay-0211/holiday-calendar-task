const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Holiday Schema
const holidaySchema = new mongoose.Schema({
  name: String,
  date: String,
});

const Holiday = mongoose.model("Holiday", holidaySchema);

// Routes
app.get("/", (req, res) => {
  res.send("Holiday Calendar API is Running");
});

// ➤ Get all holidays
app.get("/api/holidays", async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ Add a holiday
app.post("/api/holidays", async (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ message: "Name and Date are required" });
  }
  try {
    const holiday = new Holiday({ name, date });
    await holiday.save();
    res.status(201).json(holiday);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ Delete a holiday
app.delete("/api/holidays/:id", async (req, res) => {
  try {
    await Holiday.findByIdAndDelete(req.params.id);
    res.json({ message: "Holiday deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server only if this is the main module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app; // Export app for testing purposes
