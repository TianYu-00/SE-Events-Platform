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
  }

  next(err);
};

module.exports = errorHandler;
