const mongoose = require('mongoose');

// Define the schema
const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Make this field mandatory
        trim: true      // Remove whitespace from both ends
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'], // Define acceptable values
        default: 'Open' // Set a default value
    },
    assignedTo: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when a new incident is created
    },
    updatedAt: {
        type: Date
    }
});

// Automatically update updatedAt before saving changes
incidentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create a model from the schema
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;