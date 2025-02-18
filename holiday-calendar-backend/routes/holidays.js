const express = require("express");
const router = express.Router();
const {
  addHoliday,
  getHolidays,
  deleteHoliday,
} = require("../controllers/holidayController");

// Define Routes
router.post("/", addHoliday);
router.get("/", getHolidays);
router.delete("/:id", deleteHoliday);

module.exports = router;
