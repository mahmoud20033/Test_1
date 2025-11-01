const express = require('express');
const router = express.Router();
const storeSupController = require('../Controllers/storeSupervisor');
const authontication = require('../middleware/auth');

router.get('/scrapSup', storeSupController.getallStoreSupervisor)
router.post('/scrapSup', storeSupController.createStoreSupervisor)
router.put('/scrapSup/:id', authontication, storeSupController.updateStoreSupervisor)
router.delete('/scrapSup/:id', authontication, storeSupController.deleteStoreSupervisor)

module.exports = router;