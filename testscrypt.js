const crypto = require('crypto');

// Example stored hash and salt from the database
const storedHash = '343b7ed63f9a80b1aed026b4ca4eb076:af77bb60953e21a933bd1ddd7808c354feb3ed90640bbaa81071d99f2e7e175d8e4f1f0271f3d48fb3ca0dda4c9ee893894caa01d7a0072e8e1ac47ee957ed55'; // Use actual hash from DB
const password = 'crissjoyal@2002'; // Input password (during login)

// Log the stored hash to check its format
console.log('Stored Hash from DB:', storedHash);

// Extract the salt and stored hash from the storedHash string
const [salt, storedHashValue] = storedHash.split(':');

console.log('Salt:', salt);
console.log('Stored Hash:', storedHashValue);

// Now, hash the entered password using the same salt
crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) throw err;
    
    // Generated hash from the entered password
    const generatedHash = derivedKey.toString('hex');
    
    console.log('Generated Hash from Password:', generatedHash);
    
    // Compare the generated hash with the stored hash
    if (storedHashValue === generatedHash) {
        console.log('Password matches');
    } else {
        console.log('Password does not match');
    }
});
