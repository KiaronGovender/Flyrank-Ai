const express = require("express");

const app = express();
const PORT = 3000;

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
    done: true,
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
