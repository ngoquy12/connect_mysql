const express = require("express");
const app = express();
const database = require("./connection/connectMySQL");

// Import route
const userRouter = require("./routes/user.routes");

// use router
app.use("/api/v1/users", userRouter);

app.listen(8080, () => {
  console.log(`http://localhost:8080`);
});
