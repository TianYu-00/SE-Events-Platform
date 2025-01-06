const { getAllEvents } = require("../models/events.models");

exports.fetchAllEvents = async (req, res, next) => {
  try {
    const data = await getAllEvents();
    res.json({ success: true, msg: "Events have been fetched", data: data });
  } catch (err) {
    next(err);
  }
};
