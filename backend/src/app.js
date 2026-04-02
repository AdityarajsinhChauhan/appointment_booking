const express = require("express");
const cors = require("cors");

const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

const routes = require('./routes/index');

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api",routes);

app.use(errorMiddleware);

module.exports = app;