const express = require('express');
const router = express.Router();
const materialController = require('../Controllers/Material');
const authentication = require('../middleware/auth');

router.get('/Material', materialController.getallMaterial)
router.post('/Material', authentication, materialController.createMaterial)
router.put('/Material/:code', authentication, materialController.updateMaterial)
router.delete('/Material/:code', authentication, materialController.deleteMaterial)

module.exports = router;