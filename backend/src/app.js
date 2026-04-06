const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
    credentials: true, 
  }));
app.use(express.json());

const routes = require('./routes/index');

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api",routes);

app.use(errorMiddleware);

module.exports = app;