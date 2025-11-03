const express = require("express");
const router = express.Router();
const authController = require("../Controllers/Users");
const authentication = require('../middleware/auth');

// Register route
router.post("/user/register", authController.register);

// Login route
router.post("/user/login", authController.login);

// Check if manager exists (for debugging)
router.get("/user/check-manager", authController.checkManager);

// Reset manager password (for debugging - remove in production)
router.post("/user/reset-manager", authController.resetManager);

// Get all users (protected - manager only)
router.get("/users", authentication, authController.getAllUsers);

// Update user permissions (protected - manager only)
router.put("/user/permissions", authentication, authController.updateUserPermissions);

// Update user role (protected - manager only)
router.put("/user/role", authentication, authController.updateUserRole);

// Update user info (protected - manager only)
router.put("/user/info", authentication, authController.updateUserInfo);

// Delete user (protected - manager only)
router.delete("/user/:email", authentication, authController.deleteUser);

module.exports = router;