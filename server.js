require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));


// Sample route
app.get('/', (req, res) => {
    res.send('Incident Record Web App is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
