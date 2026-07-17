const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapi = require("./openapi.json");

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
    const filteredTasks = tasks.filter(
      (task) => task.done === (done === "true"),
    );

    return res.json(filteredTasks);
  }
  return res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

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

  const task = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Empty or invalid body" });
  }

  const id = Number(req.params.id);

  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
  };

  return res.status(200).json(tasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Unknown id" });
  }

  tasks = tasks.filter((task) => task.id !== id);

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
