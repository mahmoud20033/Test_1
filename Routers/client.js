const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/client');
const authentication = require('../middleware/auth');

router.get('/client', clientController.getallClients)
router.post('/client', authentication, clientController.createClients)
router.put('/client/:code', authentication, clientController.updateClients)
router.delete('/client/:code', authentication, clientController.deleteClients)

module.exports = router;