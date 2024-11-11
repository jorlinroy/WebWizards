require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const Incident = require('./models/Incident'); // Import the Incident model

const app = express();

// Middleware to parse JSON
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 15000, // Increase timeout
    socketTimeoutMS: 45000 // Increase socket timeout
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Error connecting to MongoDB:', error));



// Sample route
app.get('/', (req, res) => {
    res.send('Incident Record Web App is running');
});

// Route to create a new incident
app.post('/api/incidents', async (req, res) => {
    try {
        const incident = new Incident(req.body); // Create a new incident using the request body
        await incident.save(); // Save the new incident to the database
        res.status(201).json(incident); // Respond with the created incident
    } catch (error) {
        res.status(400).json({ error: error.message }); // Respond with an error if there’s an issue
    }
});

// Route to get all incidents
app.get('/api/incidents', async (req, res) => {
    try {
        const incidents = await Incident.find(); // Get all incidents from the database
        res.status(200).json(incidents); // Return the list of incidents
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a specific incident by ID
app.get('/api/incidents/:id', async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id); // Find incident by ID
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(incident); // Return the found incident
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to update an incident by ID
app.put('/api/incidents/:id', async (req, res) => {
    try {
        const updatedIncident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIncident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(updatedIncident); // Return the updated incident
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to delete an incident by ID
app.delete('/api/incidents/:id', async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id); // Delete incident by ID
        if (!incident) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(204).send(); // Return no content after successful deletion
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
