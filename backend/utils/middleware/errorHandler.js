const errorHandler = (err, req, res, next) => {
  if (err.code === "ERROR") {
    return res.status(400).send({
      success: false,
      msg: err.message || "Error",
      data: null,
      code: err.code,
    });
  }

  next(err);
};

module.exports = errorHandler;
