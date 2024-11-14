const mongoose = require('mongoose');
const crypto = require('crypto'); // For scrypt

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
        enum: ['admin', 'technician', 'user'],
        default: 'user',
    },
});

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Don't rehash if password isn't modified

    try {
        const salt = crypto.randomBytes(16).toString('hex'); // Generate salt
        const hashedPassword = await new Promise((resolve, reject) => {
            crypto.scrypt(this.password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(`${salt}:${derivedKey.toString('hex')}`); // Save in salt:hash format
            });
        });
        this.password = hashedPassword; // Set hashed password
        next();
    } catch (error) {
        next(error); // Handle any errors
    }
});

// Compare password for login
userSchema.methods.comparePassword = async function (password) {
    const [salt, storedHash] = this.password.split(':'); // Extract salt and stored hash
    console.log('Salt:', salt);
    console.log('Stored Hash:', storedHash);

    // Generate hash from entered password and compare
    const hashedBuffer = await new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey);
        });
    });

    const generatedHash = hashedBuffer.toString('hex');
    console.log('Generated Hash from Password:', generatedHash);

    // Compare stored hash with generated hash
    return storedHash === generatedHash;
};

module.exports = mongoose.model('User', userSchema);
