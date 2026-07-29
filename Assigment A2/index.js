const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const Database = require("better-sqlite3");

const db = new Database("tasks.db");
const app = express();

app.use(express.json());

const PORT = 3000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

let tasks = [
  {
    id: 1,
    title: "Hello, Server!",
    done: true,
  },
  {
    id: 2,
    title: "Your first real endpoint!",
    done: true,
  },
  {
    id: 3,
    title: "Read: List and single task",
    done: false,
  },
];

app.get("/", (req, res) => {
  return res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  const { done } = req.query;

  if (done !== undefined) {
    const filteredTasks = db
      .prepare("SELECT * FROM tasks WHERE done = 1")
      .all();

    return res.json(filteredTasks);
  }
  const tasks = db.prepare("SELECT * FROM tasks").all();

  return res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").all(id);

  if (!task) {
    return res.status(404).json({ error: `Task ${id} not found` });
  }

  return res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({ error: "Title missing or empty" });
  }

  const insertTask = db.prepare(`
    INSERT INTO tasks (title, done)
    VALUES (?, ?)
  `);

  insertTask.run(title, 0);

  return res.status(201).json({ title: title, done: 0 });
});

app.put("/tasks/:id", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Empty or invalid body" });
  }

  const id = Number(req.params.id);

  const index = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (index === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = db
    .prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?")
    .run(req.body.title, req.body.done, id);

  return res.status(200).json({});
});

// Delete task with ID
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if (!task) {
    return res.status(404).json({ error: "Unknown id" });
  }

  const deleteTask = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

  return res.status(204).send();
});

app.get("/stats", (req, res) => {
  const total = tasks.length;

  let doneCount = tasks.filter((task) => task.done).length;

  return res
    .status(200)
    .json({ total: total, done: doneCount, open: total - doneCount });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/docs`);
});
