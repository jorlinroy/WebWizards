const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  reportedBy: { type: String, required: true },
  assignedTo: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Incident", incidentSchema);
