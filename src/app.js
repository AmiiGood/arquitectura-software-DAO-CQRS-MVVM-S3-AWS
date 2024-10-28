const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const authRoutes = require("../routes/authRoutes");
const bookRoutes = require("../routes/bookRoutes");

const app = express();

const JWT_SECRET = uuidv4();
console.log("JWT_SECRET generado:", JWT_SECRET);

process.env.JWT_SECRET = JWT_SECRET;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

module.exports = app;
