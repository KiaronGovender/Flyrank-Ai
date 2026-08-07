const pool = require("./db");

async function seedDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT FALSE
      );
    `);

    const countResult = await pool.query("SELECT COUNT(*) FROM tasks");
    if (parseInt(countResult.rows[0].count, 10) === 0) {
      await pool.query("INSERT INTO tasks (title, done) VALUES ($1, $2)", [
        "Learn Express.js",
        false,
      ]);
      await pool.query("INSERT INTO tasks (title, done) VALUES ($1, $2)", [
        "Build a REST API",
        true,
      ]);
      await pool.query("INSERT INTO tasks (title, done) VALUES ($1, $2)", [
        "Practice SQL queries",
        false,
      ]);
      console.log("Database seeded successfully!");
    }
  } catch (err) {
    console.error("Database seeding error:", err);
  }
}

module.exports = seedDatabase;

