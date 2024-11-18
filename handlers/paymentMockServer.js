const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.post("/api/v1/payments", (req, res) => {
  setTimeout(() => {
    res.json({ message: "Mock response after 1 second" });
  }, 1000);
});

module.exports.handler = serverless(app);
