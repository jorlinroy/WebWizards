const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Technician', 'User'], // Define roles as needed
        default: 'User',
    },
});

module.exports = mongoose.model('User', userSchema);

