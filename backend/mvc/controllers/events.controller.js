const { getAllEvents, createEvent } = require("../models/events.models");

exports.fetchAllEvents = async (req, res, next) => {
  try {
    const { order_created_at: orderCreatedAt } = req.query;
    const validOrderQueries = ["asc", "desc"];

    if (orderCreatedAt && !validOrderQueries.includes(orderCreatedAt.toLowerCase())) {
      const error = new Error("Invalid order query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    const validatedOrder = orderCreatedAt ? orderCreatedAt.toUpperCase() : undefined;

    const data = await getAllEvents({ orderCreatedAt: validatedOrder });
    res.json({ success: true, msg: "Events have been fetched", data: data });
  } catch (err) {
    next(err);
  }
};

exports.postEvent = async (req, res, next) => {
  try {
    const eventData = req.body;
    const requiredFields = [
      "eventName",
      "startDate",
      "endDate",
      "fullAddress",
      "description",
      "organizerUserId",
      "capacity",
      "attendees",
      "costInPence",
      "contactEmail",
      "thumbnail",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in eventData) || eventData[field] === null || eventData[field] === undefined
    );

    if (missingFields.length > 0) {
      const error = new Error("Some fields are missing");
      error.code = "BODY_CONTENT_INCOMPLETE";
      return next(error);
    }

    const data = await createEvent(eventData);
    res.json({ success: true, msg: "Event posted", data: data });
  } catch (err) {
    next(err);
  }
};
