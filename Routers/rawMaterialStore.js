const express = require('express');
const router = express.Router();
const materialController = require('../Controllers/Material');
const authontication = require('../middleware/auth');

router.get('/Material', materialController.getallMaterial)
router.post('/Material', materialController.createMaterial)
router.put('/Material/:id', authontication, materialController.updateMaterial)
router.delete('/Material/:id', authontication, materialController.deleteMaterial)

module.exports = router;