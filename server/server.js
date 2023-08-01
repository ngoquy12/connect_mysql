const express = require("express");
const app = express();
const database = require("./connection/connectMySQL");

app.get("/", (req, res) => {
  res.send("Hello wworld");
});

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
