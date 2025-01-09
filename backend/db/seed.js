const db = require("./connection");
const format = require("pg-format");

async function createTables({ users, events }) {
  try {
    await db.query("DROP TABLE IF EXISTS events CASCADE;");

    await createEventsTable();

    await insertEvents(events);
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

async function createUsersTable() {
  await db.query(`
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      user_username VARCHAR(255) NOT NULL,
      user_company_name VARCHAR(255),
      user_email VARCHAR(255) UNIQUE NOT NULL,
      user_password VARCHAR(255) NOT NULL,
      user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_role VARCHAR(50) DEFAULT 'user' NOT NULL
    );
  `);
}

async function createEventsTable() {
  await db.query(`
    CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      event_start_date TIMESTAMP NOT NULL,
      event_end_date TIMESTAMP NOT NULL,
      event_full_address VARCHAR(255) NOT NULL,
      event_description TEXT NOT NULL,
      event_organizer_id VARCHAR(255) NOT NULL,
      event_capacity INT NOT NULL,
      event_attendees INT NOT NULL,
      event_cost_in_pence INT NOT NULL,
      event_contact_email VARCHAR(255) NOT NULL,
      event_contact_phone_prefix VARCHAR(5) NOT NULL,
      event_contact_phone VARCHAR(15) NOT NULL,
      event_website VARCHAR(255),
      event_tags TEXT[],
      event_thumbnail VARCHAR(255) NOT NULL,
      event_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      event_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

//////////////////////////////////////////////////////// SEED DATA
async function insertEvents(events) {
  const eventValues = events.map((event) => [
    event.eventName,
    event.startDate,
    event.endDate,
    event.fullAddress,
    event.description,
    event.organizerUserId,
    event.capacity,
    event.attendees,
    event.costInPence,
    event.contactEmail,
    event.contactPhonePrefix,
    event.contactPhone,
    event.website,
    `{${event.tags.join(",")}}`,
    event.thumbnail,
    event.createdAt,
    event.modifiedAt,
  ]);

  // console.log(eventValues);

  const query = format(
    `INSERT INTO events (event_name, event_start_date, event_end_date, event_full_address, event_description, event_organizer_id, event_capacity, event_attendees, event_cost_in_pence, event_contact_email, event_contact_phone_prefix, event_contact_phone, event_website, event_tags, event_thumbnail, event_created_at, event_modified_at) VALUES %L`,
    eventValues
  );

  await db.query(query);
}

module.exports = createTables;
