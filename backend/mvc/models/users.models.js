const db = require("../../db/connection");

exports.cleanupUser = async (userId) => {
  try {
    const query = `
    UPDATE purchases
    SET purchase_user_id = 'deleted-user'
    WHERE purchase_user_id = $1
    RETURNING *;
    `;

    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    return Promise.reject(err);
  }
};
