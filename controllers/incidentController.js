const Incident = require("../models/incidentModel");

// Create a new incident
exports.createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all incidents
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get incident by ID
exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
