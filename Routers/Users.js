const express = require("express");
const router = express.Router();
const authController = require("../Controllers/Users");

// Register route
router.post("/user/register", authController.register);

// Login route
router.post("/user/login", authController.login);

module.exports = router;