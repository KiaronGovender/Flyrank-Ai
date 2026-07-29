const express = require("express");

const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Local in-memory task storage
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    description: "Build a REST API",
    done: false,
  },
  {
    id: 2,
    title: "Learn CRUD",
    description: "Understand API operations",
    done: true,
  },
];

// Helper function to find task by ID
function findTask(id) {
  return tasks.find((task) => task.id === Number(id));
}

// GET all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// GET single task
app.get("/tasks/:id", (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title, description, done } = req.body;

  // Validation
  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (typeof done !== "boolean" && done !== undefined) {
    return res.status(400).json({
      message: "Done must be a boolean",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || "",
    done: done || false,
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task created",
    task: newTask,
  });
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const task = findTask(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, description, done } = req.body;

  // Validation
  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({
      message: "Done must be a boolean",
    });
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (done !== undefined) {
    task.done = done;
  }

  res.status(200).json({
    message: "Task updated",
    task,
  });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const taskIndex = tasks.findIndex(
    (task) => task.id === Number(req.params.id),
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted",
    task: deletedTask[0],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
