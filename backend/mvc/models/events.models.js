const db = require("../../db/connection");

exports.getAllEvents = async ({ orderCreatedAt = undefined }) => {
  try {
    let query = "SELECT * FROM events";

    if (orderCreatedAt) {
      query += ` ORDER BY event_created_at ${orderCreatedAt}`;
    }

    const result = await db.query(query);
    return result.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
