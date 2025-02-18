const Holiday = require("../models/Holiday");

// @desc   Add a new holiday
// @route  POST /api/holidays
exports.addHoliday = async (req, res) => {
  try {
    const { date, name } = req.body;
    const holiday = new Holiday({ date, name });
    await holiday.save();
    res.status(201).json(holiday);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get all holidays
// @route  GET /api/holidays
exports.getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.status(200).json(holidays);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Delete a holiday
// @route  DELETE /api/holidays/:id
exports.deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) return res.status(404).json({ message: "Holiday not found" });

    await holiday.remove();
    res.status(200).json({ message: "Holiday removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
