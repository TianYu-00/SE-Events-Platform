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

exports.getEventById = async (eventId) => {
  try {
    let query = "SELECT * FROM events WHERE event_id = $1;";

    const result = await db.query(query, [eventId]);
    if (result.rows <= 0) {
      return Promise.reject({ code: "EVENT_NOT_FOUND", message: "Event not found" });
    }
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
      eventData.event_name,
      eventData.event_start_date,
      eventData.event_end_date,
      eventData.event_full_address,
      eventData.event_description,
      eventData.event_organizer_id,
      eventData.event_capacity,
      eventData.event_attendees,
      eventData.event_cost_in_pence,
      eventData.event_contact_email,
      eventData.event_contact_phone_prefix,
      eventData.event_contact_phone,
      eventData.event_website,
      eventData.event_tags,
      eventData.event_thumbnail,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.removeEvents = async (eventIds) => {
  try {
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

exports.patchEvent = async (eventId, eventData) => {
  try {
    await exports.getEventById(eventId);

    const fields = [];
    const values = [];
    let counter = 1;

    for (const [key, value] of Object.entries(eventData)) {
      fields.push(`${key} = $${counter++}`);
      values.push(value);
    }

    fields.push(`event_modified_at = CURRENT_TIMESTAMP`);

    values.push(eventId);

    const query = `
      UPDATE events
      SET ${fields.join(", ")}
      WHERE event_id = $${counter}
      RETURNING *;
    `;

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
