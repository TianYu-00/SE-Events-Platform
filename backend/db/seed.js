const db = require("./connection");
const format = require("pg-format");

async function createTables({ users }) {
  try {
    await db.query("DROP TABLE IF EXISTS users CASCADE;");

    await createUsersTable();

    await insertUsers(users);
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

async function createUsersTable() {
  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      role VARCHAR(50) DEFAULT 'user' NOT NULL
    );
  `);
}

async function insertUsers(users) {
  const userValues = users.map((user) => [user.username, user.email, user.password, user.role]);
  const query = format(`INSERT INTO users (username, email, password, role) VALUES %L`, userValues);
  await db.query(query);
}

module.exports = createTables;
