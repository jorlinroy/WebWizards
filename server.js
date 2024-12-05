const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const incidentRoutes = require("./routes/incidentRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const cors = require("cors");
require("dotenv").config();

const app = express();

// Enable CORS with appropriate headers
const corsOptions = {
  origin: "*", // Allow all origins for testing. Restrict this in production.
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Headers:", req.headers);
  next();
});

// Parse incoming JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/incidents", incidentRoutes); // Incident routes
app.use("/api/users", userRoutes); // User routes

// Default route for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
