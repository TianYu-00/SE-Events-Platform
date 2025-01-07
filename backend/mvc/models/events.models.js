const db = require("../../db/connection");

exports.getAllEvents = async () => {
  try {
    const result = await db.query(`
      SELECT 
        events.*, 
        organizer.user_username AS event_organizer_username,
        organizer.user_company_name AS event_organizer_company
      FROM 
        events
      JOIN 
        users AS organizer ON events.event_organizer = organizer.user_id;
    `);
    return result.rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
