const express = require("express");

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
