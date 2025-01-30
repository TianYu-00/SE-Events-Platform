const { getAllEvents, createEvent, removeEvents, patchEvent, getEventById } = require("../models/events.models");

exports.fetchAllEvents = async (req, res, next) => {
  try {
    const {
      order_created_at: orderCreatedAt,
      order_start_date: orderStartDate,
      is_allow_outdated: isAllowOutdated,
    } = req.query;
    const validOrderQueries = ["asc", "desc"];

    if (orderCreatedAt && !validOrderQueries.includes(orderCreatedAt.toLowerCase())) {
      const error = new Error("Invalid order_created_at query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    if (orderStartDate && !validOrderQueries.includes(orderStartDate.toLowerCase())) {
      const error = new Error("Invalid order_date query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    if (
      isAllowOutdated !== undefined &&
      isAllowOutdated !== null &&
      isAllowOutdated !== "true" &&
      isAllowOutdated !== "false"
    ) {
      const error = new Error("Invalid isAllowOutdated query");
      error.code = "INVALID_QUERY";
      return next(error);
    }

    const validatedOrder = orderCreatedAt ? orderCreatedAt.toUpperCase() : undefined;
    const validatedOrderStartDate = orderStartDate ? orderStartDate.toUpperCase() : undefined;
    const parsedIsAllowOutdated = isAllowOutdated === "true";

    const data = await getAllEvents({
      orderCreatedAt: validatedOrder,
      orderStartDate: validatedOrderStartDate,
      isAllowOutdated: parsedIsAllowOutdated,
    });
    res.json({ success: true, msg: "Events have been fetched", data: data });
  } catch (error) {
    next(error);
  }
};

exports.getSingleEvent = async (req, res, next) => {
  try {
    const { event_id: eventId } = req.params;
    if (isNaN(eventId) || Number(eventId) <= 0) {
      const error = new Error("Event id is not valid");
      error.code = "INVALID_PARAMS";
      return next(error);
    }

    const data = await getEventById(eventId);
    res.json({ success: true, msg: "Event fetched", data: data });
  } catch (error) {
    next(error);
  }
};

exports.postEvent = async (req, res, next) => {
  try {
    const eventData = req.body;
    const requiredFields = [
      "event_name",
      "event_start_date",
      "event_end_date",
      "event_street_address",
      "event_city_town",
      "event_postcode",
      "event_description",
      "event_organizer_id",
      "event_capacity",
      "event_attendees",
      "event_cost_in_pence",
      "event_contact_email",
      "event_thumbnail",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in eventData) || eventData[field] === null || eventData[field] === undefined
    );

    if (missingFields.length > 0) {
      const error = new Error("Some fields are missing");
      error.code = "INVALID_REQUEST_BODY";
      return next(error);
    }

    const data = await createEvent(eventData);
    res.json({ success: true, msg: "Event posted", data: data });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvents = async (req, res, next) => {
  try {
    const { event_id: eventIds } = req.body;
    if (!eventIds || eventIds.length <= 0) {
      const error = new Error("Some fields are missing");
      error.code = "INVALID_REQUEST_BODY";
      return next(error);
    }

    const data = await removeEvents(eventIds);
    // console.log(data);
    const deletedEventsLength = data.deletedIds.length;
    const failedToDeleteEventLength = data.failedToDeleteIds.length;
    res.json({
      success: true,
      msg: `Deleted ${deletedEventsLength} event${deletedEventsLength > 1 ? "s" : ""}. ${
        failedToDeleteEventLength > 1
          ? `Failed to delete ${failedToDeleteEventLength} event${failedToDeleteEventLength > 1 ? "s" : ""}`
          : ""
      }`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.editEvents = async (req, res, next) => {
  try {
    const { event_id: eventId } = req.params;
    if (isNaN(eventId) || Number(eventId) <= 0) {
      const error = new Error("Event id is not valid");
      error.code = "INVALID_PARAMS";
      return next(error);
    }

    const eventData = req.body;
    const allowedFields = [
      "event_name",
      "event_start_date",
      "event_end_date",
      "event_street_address",
      "event_city_town",
      "event_postcode",
      "event_description",
      "event_capacity",
      "event_attendees",
      "event_cost_in_pence",
      "event_contact_email",
      "event_contact_phone_prefix",
      "event_contact_phone",
      "event_website",
      "event_tags",
      "event_thumbnail",
      "event_modified_at",
    ];
    const isValid = Object.keys(eventData).every((key) => allowedFields.includes(key));
    if (!isValid) {
      const error = new Error("Some object keys are invalid");
      error.code = "INVALID_REQUEST_BODY";
      return next(error);
    }

    const data = await patchEvent(eventId, eventData);

    res.json({ success: true, msg: "Event updated", data: data });
  } catch (error) {
    next(error);
  }
};
