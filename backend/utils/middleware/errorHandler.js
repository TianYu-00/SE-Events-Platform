const errorHandler = (err, req, res, next) => {
  switch (err.code) {
    case "MISSING_CREDENTIALS":
      return res.status(400).send({
        success: false,
        msg: err.message || "Missing Credentials",
        data: null,
        code: err.code,
      });

    case "INITIALIZATION_NOT_REQUIRED":
      return res.status(400).send({
        success: false,
        msg: err.message || "No need to initialize",
        data: null,
        code: err.code,
      });

    case "INVALID_REQUEST":
      return res.status(400).send({
        success: false,
        msg: err.message || "Invalid request",
        data: null,
        code: err.code,
      });

    case "INVALID_REQUEST_BODY":
      return res.status(400).send({
        success: false,
        msg: err.message || "Invalid request body",
        data: null,
        code: err.code,
      });

    case "NO_EVENT_DELETED":
      return res.status(400).send({
        success: false,
        msg: err.message || "No event was deleted",
        data: null,
        code: err.code,
      });

    case "EVENT_ALREADY_PURCHASED":
      return res.status(409).send({
        success: false,
        msg: err.message || "Event already purchased",
        data: null,
        code: err.code,
      });

    case "DATA_OUT_OF_SYNC":
      return res.status(409).send({
        success: false,
        msg: err.message || "Data out of sync, please refresh and try again",
        data: null,
        code: err.code,
      });

    case "INVALID_CAPACITY_ATTENDEES":
      return res.status(409).send({
        success: false,
        msg: err.message || "Invalid attendee or capacity data.",
        data: null,
        code: err.code,
      });

    case "NO_TICKETS_AVAILABLE":
      return res.status(409).send({
        success: false,
        msg: err.message || "Tickets are not available.",
        data: null,
        code: err.code,
      });

    case "RESOURCE_NOT_FOUND":
      return res.status(404).send({
        success: false,
        msg: err.message || "Resource not found.",
        data: null,
        code: err.code,
      });

    case "ACCESS_DENIED":
      return res.status(403).send({
        success: false,
        msg: err.message || "Access denied.",
        data: null,
        code: err.code,
      });

    default:
      next(err);
  }
};

module.exports = errorHandler;
