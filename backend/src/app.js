const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://appointment-booking-psi-teal.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // mobile/postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

const routes = require('./routes/index');

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api",routes);

app.use(errorMiddleware);

module.exports = app;