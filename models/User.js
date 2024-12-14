const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username field
  password: { type: String, required: true },              // Plaintext password field
  role: { type: String, default: 'user' },                 // Role field with default value
});

module.exports = mongoose.model('User', UserSchema);
