const db = require("../../db/connection");

exports.getAllUsers = async () => {
  try {
    const result = await db.query(`SELECT * FROM users;`);
    return result.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
