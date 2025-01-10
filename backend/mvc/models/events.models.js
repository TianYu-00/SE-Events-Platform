const db = require("../../db/connection");

exports.getAllEvents = async ({ orderCreatedAt = undefined }) => {
  try {
    let query = "SELECT * FROM events";

    if (orderCreatedAt) {
      query += ` ORDER BY event_created_at ${orderCreatedAt}`;
    }

    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.createEvent = async (eventData) => {
  try {
    // console.log(eventData);
    const query = `
      INSERT INTO events (
        event_name, 
        event_start_date, 
        event_end_date, 
        event_full_address, 
        event_description, 
        event_organizer_id, 
        event_capacity, 
        event_attendees, 
        event_cost_in_pence, 
        event_contact_email, 
        event_contact_phone_prefix, 
        event_contact_phone, 
        event_website, 
        event_tags, 
        event_thumbnail
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      ) RETURNING *;
    `;

    const values = [
      eventData.eventName,
      eventData.startDate,
      eventData.endDate,
      eventData.fullAddress,
      eventData.description,
      eventData.organizerUserId,
      eventData.capacity,
      eventData.attendees,
      eventData.costInPence,
      eventData.contactEmail,
      eventData.contactPhonePrefix,
      eventData.contactPhone,
      eventData.website,
      eventData.tags,
      eventData.thumbnail,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.removeEvents = async (eventIds) => {
  try {
    // loop through the event ids
    // maybe use WHERE id = ANY($1) and then we pass the event ids in should be easier instead of looping creating multiple database queries
    const query = `DELETE FROM events WHERE event_id = ANY($1) RETURNING *;`;
    const result = await db.query(query, [eventIds]);
    const deletedIds = result.rows.map((row) => row.event_id);
    const failedToDeleteIds = eventIds.filter((id) => !deletedIds.includes(id));
    if (deletedIds <= 0) {
      return Promise.reject({ code: "NO_EVENT_DELETED", message: "No event was deleted" });
    }
    // Note: Still need to remove image from cloudinary.
    return { deletedRows: result.rows, deletedIds, failedToDeleteIds, length: result.rows.length };
  } catch (error) {
    return Promise.reject(error);
  }
};
