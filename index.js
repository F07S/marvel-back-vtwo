const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI);

const dataRoutes = require("./routes/comicscharacters");
app.use(dataRoutes);
const userRoutes = require("./routes/user");
app.use(userRoutes);

app.get("/", (req, res) => {
  try {
    res.json("Test route");
  } catch {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Route introuvable");
});

app.listen(process.env.PORT || 4500, () => {
  console.log("Server started");
});
