const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure middleware is properly imported

// Create an incident
router.post('/', async (req, res) => {
  try {
    console.log('Creating a new incident...'); // Debugging log
    const newIncident = new Incident(req.body);
    const savedIncident = await newIncident.save();
    res.status(201).json(savedIncident);
  } catch (err) {
    console.error('Error creating incident:', err); // Debugging log
    res.status(400).json({ error: 'Failed to create incident' });
  }
});

// Get all incidents (Protected route)
router.get('/', authMiddleware, async (req, res) => {
  console.log('Fetching incidents from database...'); // Debugging log
  try {
    const incidents = await Incident.find(); // Fetch all incidents from the database
    res.status(200).json(incidents);
  } catch (err) {
    console.error('Error fetching incidents:', err); // Debugging log
    res.status(500).json({ error: 'Failed to fetch incidents' });
  }
});

// Update an incident
router.put('/:id', async (req, res) => {
  try {
    console.log(`Updating incident with ID: ${req.params.id}`); // Debugging log
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedIncident);
  } catch (err) {
    console.error(`Error updating incident with ID: ${req.params.id}`, err); // Debugging log
    res.status(400).json({ error: 'Failed to update incident' });
  }
});

// Delete an incident (Optional, if you need it)
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting incident with ID: ${req.params.id}`); // Debugging log
    await Incident.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Incident deleted successfully' });
  } catch (err) {
    console.error(`Error deleting incident with ID: ${req.params.id}`, err); // Debugging log
    res.status(500).json({ error: 'Failed to delete incident' });
  }
});

module.exports = router;
