const express = require('express');
const router = express.Router();
const supplierController = require('../Controllers/supplier');
const authontication = require('../middleware/auth');

router.get('/supplier', supplierController.getallSupplier)
router.post('/supplier', supplierController.createSupplier)
router.put('/supplier/:id', authontication, supplierController.updateSupplier)
router.delete('/supplier/:id', authontication, supplierController.deleteSupplier)

module.exports = router;