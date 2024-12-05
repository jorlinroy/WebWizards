const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Authorization header:", req.header("Authorization"));
  console.log("Extracted token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};
