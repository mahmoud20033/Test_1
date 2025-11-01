const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/client');
const authontication = require('../middleware/auth');

router.get('/client', clientController.getallClients)
router.post('/client', clientController.createClients)
router.put('/client/:id', authontication, clientController.updateClients)
router.delete('/client/:id', authontication, clientController.deleteClients)

module.exports = router;