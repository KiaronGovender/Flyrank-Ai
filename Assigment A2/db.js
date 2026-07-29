const Database = require("better-sqlite3");

const db = new Database("tasks.db");

db.exec(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    done BOOLEAN
  )`);

const insertTask = db.prepare(`
  INSERT INTO tasks (title, done)
  VALUES (?, ?)
`);

insertTask.run("Learn Express.js", 0);
insertTask.run("Build a REST API", 1);
insertTask.run("Practice SQL queries", 0);

console.log("Database seeded successfully!");

module.exports = db;
