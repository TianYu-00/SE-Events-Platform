const db = require("./connection");
const format = require("pg-format");

async function createTables({ events, purchases }) {
  try {
    await db.query("DROP TABLE IF EXISTS purchases CASCADE;");
    await db.query("DROP TABLE IF EXISTS events CASCADE;");

    await createEventsTable();
    await createPurchasesTable();

    await insertEvents(events);
    await insertPurchases(purchases);
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

//////////////////////////////////////////////////////// CREATE TABLE
async function createEventsTable() {
  await db.query(`
    CREATE TABLE events (
      event_id SERIAL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      event_start_date TIMESTAMP NOT NULL,
      event_end_date TIMESTAMP NOT NULL,
      event_street_address VARCHAR(255) NOT NULL,
      event_city_town VARCHAR(255) NOT NULL,
      event_postcode VARCHAR(10) NOT NULL,
      event_description TEXT NOT NULL,
      event_organizer_id VARCHAR(255) NOT NULL,
      event_capacity INT NOT NULL,
      event_attendees INT NOT NULL DEFAULT 0,
      event_cost_in_pence INT NOT NULL DEFAULT 0,
      event_contact_email VARCHAR(255) NOT NULL,
      event_contact_phone_prefix VARCHAR(5) NULL,
      event_contact_phone VARCHAR(15) NULL,
      event_website VARCHAR(255) NULL,
      event_tags TEXT[] NULL,
      event_thumbnail VARCHAR(255) NOT NULL,
      event_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      event_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function createPurchasesTable() {
  await db.query(`
    CREATE TABLE purchases (
      purchase_id SERIAL PRIMARY KEY,
      purchase_user_id VARCHAR(255) NOT NULL,
      purchase_payment_intent_id VARCHAR(255),
      purchase_payment_charge_id VARCHAR(255),
      purchase_event_id INT NOT NULL,
      purchase_event_name VARCHAR(255) NOT NULL,
      purchase_amount_in_pence INT NOT NULL,
      purchase_captured_amount_in_pence INT NOT NULL DEFAULT 0,
      purchase_refunded_amount_in_pence INT NOT NULL DEFAULT 0,
      purchase_payment_status VARCHAR(255) NOT NULL,
      purchase_descriptive_status VARCHAR(255),
      purchase_created_at TIMESTAMP NOT NULL,
      purchase_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (purchase_event_id) REFERENCES events (event_id) ON DELETE CASCADE
    );
  `);
}

//////////////////////////////////////////////////////// SEED DATA
async function insertEvents(events) {
  const eventValues = events.map((event) => [
    event.eventName,
    event.startDate,
    event.endDate,
    event.streetAddress,
    event.cityTown,
    event.postcode,
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

  const query = format(
    `INSERT INTO events (event_name, event_start_date, event_end_date, event_street_address, event_city_town, event_postcode, event_description, event_organizer_id, event_capacity, event_attendees, event_cost_in_pence, event_contact_email, event_contact_phone_prefix, event_contact_phone, event_website, event_tags, event_thumbnail, event_created_at, event_modified_at) VALUES %L`,
    eventValues
  );

  await db.query(query);
}

async function insertPurchases(purchases) {
  const purchaseValues = purchases.map((purchase) => [
    purchase.purchase_user_id,
    purchase.purchase_payment_intent_id,
    purchase.purchase_payment_charge_id,
    purchase.purchase_event_id,
    purchase.purchase_event_name,
    purchase.purchase_amount_in_pence,
    purchase.purchase_captured_amount_in_pence,
    purchase.purchase_refunded_amount_in_pence,
    purchase.purchase_payment_status,
    purchase.purchase_descriptive_status,
    purchase.purchase_created_at,
    purchase.purchase_modified_at,
  ]);

  const query = format(
    `INSERT INTO purchases (purchase_user_id, purchase_payment_intent_id, purchase_payment_charge_id, purchase_event_id, purchase_event_name, purchase_amount_in_pence, purchase_captured_amount_in_pence, purchase_refunded_amount_in_pence, purchase_payment_status, purchase_descriptive_status, purchase_created_at, purchase_modified_at) VALUES %L`,
    purchaseValues
  );

  await db.query(query);
}

module.exports = createTables;
