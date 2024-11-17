const express = require("express");
const {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");
const router = express.Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.put("/:id", updateIncident);
router.delete("/:id", deleteIncident);

module.exports = router;
