const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Use the same secret key as during signing
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    console.error('Error validating token:', err);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
