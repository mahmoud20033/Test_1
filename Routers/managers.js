const express = require('express');
const router = express.Router();
const manager = require('../Controllers/managers');
const authentication = require('../middleware/auth');

// Route to get all managers
router.get('/managers', manager.getallmanager)
router.post('/managers', authentication, manager.createmanager)
router.put('/managers/:code', authentication, manager.updatemanager)
router.delete('/managers/:code', authentication, manager.deletemanager)

module.exports = router;