const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const incidentRoutes = require("./routes/incidentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS (should be placed at the top, before routes)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/incidents", incidentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
