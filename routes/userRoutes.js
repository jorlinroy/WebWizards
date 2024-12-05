const express = require("express");
const {
  signup,
  signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new user (Sign-Up)
router.post("/signup", signup);

// Sign-In
router.post("/signin", signin);

// Get the current user's profile (protected)
router.get("/me", authenticate, getUserProfile);

// Update the current user's profile (protected)
router.put("/me", authenticate, updateUserProfile);

// Get all users (protected)
router.get("/", authenticate, getAllUsers);

// Get a user by ID (protected)
router.get("/:id", authenticate, getUserById);

// Update a user by ID (protected)
router.put("/:id", authenticate, updateUser);

// Delete a user by ID (protected)
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
