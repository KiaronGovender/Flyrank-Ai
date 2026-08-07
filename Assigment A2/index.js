const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");
const pool = require("./db");
const seedDatabase = require("./seed");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/", (req, res) => {
  return res.json({
    name: "Task API",
    version: "1.0",
    endpoints: ["/tasks"],
  });
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.json({ status: "ok", db: "connected" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const { done } = req.query;

    if (done !== undefined) {
      const isDone = done === "true" || done === "1";
      const result = await pool.query(
        "SELECT * FROM tasks WHERE done = $1 ORDER BY id ASC",
        [isDone]
      );
      return res.json(result.rows);
    }
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Task ${id} not found` });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const title = req.body.title;

    if (!title) {
      return res.status(400).json({ error: "Title missing or empty" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *",
      [title, false]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const updateTaskHandler = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty or invalid body" });
    }

    const id = Number(req.params.id);
    const { title, done } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title = COALESCE($1, title), done = COALESCE($2, done) WHERE id = $3 RETURNING *",
      [title !== undefined ? title : null, done !== undefined ? done : null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

app.put("/tasks/:id", updateTaskHandler);
app.patch("/tasks/:id", updateTaskHandler);

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Unknown id" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/stats", async (req, res) => {
  try {
    const totalResult = await pool.query("SELECT COUNT(*) FROM tasks");
    const doneResult = await pool.query(
      "SELECT COUNT(*) FROM tasks WHERE done = true"
    );

    const total = parseInt(totalResult.rows[0].count, 10);
    const doneCount = parseInt(doneResult.rows[0].count, 10);

    return res
      .status(200)
      .json({ total: total, done: doneCount, open: total - doneCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`Swagger Docs: http://localhost:${PORT}/docs`);
  });
}

startServer();
