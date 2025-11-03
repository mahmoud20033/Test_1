const express = require('express');
const router = express.Router();
const workerController = require('../Controllers/worker');
const authentication = require('../middleware/auth');

// Route to get worker information
router.get('/worker', workerController.getallWorker)
router.post('/worker', authentication, workerController.createWorker)
router.put('/worker/:code', authentication, workerController.updateWorker)
router.delete('/worker/:code', authentication, workerController.deleteWorker)

module.exports = router;