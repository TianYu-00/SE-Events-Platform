const db = require("../../db/connection");

exports.getAllEvents = async () => {
  try {
    const result = await db.query(`SELECT * FROM events;`);
    return result.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
