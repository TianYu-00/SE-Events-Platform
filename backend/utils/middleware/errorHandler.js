const errorHandler = (err, req, res, next) => {
  if (err.code === "MISSING_CREDENTIALS") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Missing Credentials",
      data: null,
      code: err.code,
    });
  }

  next(err);
};

module.exports = errorHandler;
