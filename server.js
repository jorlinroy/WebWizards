const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/authRoutes'); // Import your auth routes
const incidentRoutes = require('./routes/incidentRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS with specific origin
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://jroy:Jorlin%402003@wizard.y31ew.mongodb.net/?retryWrites=true&w=majority&appName=Wizard')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);

// Basic route
app.get('/', (req, res) => res.send('Server is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
