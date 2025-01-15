const errorHandler = (err, req, res, next) => {
  if (err.code === "MISSING_CREDENTIALS") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Missing Credentials",
      data: null,
      code: err.code,
    });
  } else if (err.code === "INITIALIZATION_NOT_REQUIRED") {
    return res.status(400).send({
      success: false,
      msg: err.message || "No need to initialize",
      data: null,
      code: err.code,
    });
  } else if (err.code === "INVALID_QUERY") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Invalid query has been provided",
      data: null,
      code: err.code,
    });
  } else if (err.code === "BODY_CONTENT_INCOMPLETE") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Request body is incomplete",
      data: null,
      code: err.code,
    });
  } else if (err.code === "NO_EVENT_DELETED") {
    return res.status(400).send({
      success: false,
      msg: err.message || "No event was deleted",
      data: null,
      code: err.code,
    });
  } else if (err.code === "BODY_CONTENT_INVALID") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Body content invalid",
      data: null,
      code: err.code,
    });
  } else if (err.code === "EVENT_NOT_FOUND") {
    return res.status(404).send({
      success: false,
      msg: err.message || "Event not found",
      data: null,
      code: err.code,
    });
  } else if (err.code === "INVALID_PARAMS") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Invalid params",
      data: null,
      code: err.code,
    });
  }

  next(err);
};

module.exports = errorHandler;
