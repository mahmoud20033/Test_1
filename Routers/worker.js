const express = require('express');
const router = express.Router();
const workerController = require('../Controllers/worker');
const authontication = require('../middleware/auth');

// Route to get worker information
router.get('/worker', workerController.getallWorker)
router.post('/worker', workerController.createWorker)
router.put('/worker/:id', authontication, workerController.updateWorker)
router.delete('/worker/:id', authontication, workerController.deleteWorker)

module.exports = router;