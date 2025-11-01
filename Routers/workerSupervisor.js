const express = require('express');
const router = express.Router();
const workerSupController = require('../Controllers/workerSupervisor');
const authontication = require('../middleware/auth');

// Route to get worker supervisor information
router.get('/workerSup', workerSupController.getallWorkerSupervisor)
router.post('/workerSup', workerSupController.createWorkerSupervisor)
router.put('/workerSup/:id', authontication, workerSupController.updateWorkerSupervisor)
router.delete('/workerSup/:id', authontication, workerSupController.deleteWorkerSupervisor)

module.exports = router;