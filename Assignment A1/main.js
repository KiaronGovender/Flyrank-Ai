const express = require("express");

const app = express();
app.use(express.json());
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

  if (!task) return res.status(404).json({ error: `Task ${id} not found` });

  return res.status(200).json(task);
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;

  if (!title) return res.status(400).json({ error: "Title missing or empty" });

  const task = {
    id: tasks.length + 1,
    title: title,
    done: false,
  };

  tasks.push(task);

  return res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  if (!req.body)
    return res.status(400).json({ error: "empty or invalid body" });

  const id = Number(req.params.id);

  let task = tasks.find((task) => task.id === id);

  if (!task) return res.status(404).json({ error: "task not found" });

  task = {
    ...task,
    ...req.body,
  };
  return res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) return res.status(404).json({ error: "Unknown id" });

  tasks = tasks.filter((task) => task.id !== id);

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
