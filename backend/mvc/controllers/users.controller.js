const { getAllUsers } = require("../models/users.models");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const data = await getAllUsers();
    res.json({ success: true, msg: "Users have been fetched", data: data });
  } catch (err) {
    next(err);
  }
};
