const express = require('express');
const router = express.Router();
const supplierController = require('../Controllers/supplier');
const authentication = require('../middleware/auth');

router.get('/supplier', supplierController.getallSupplier)
router.post('/supplier', authentication, supplierController.createSupplier)
router.put('/supplier/:code', authentication, supplierController.updateSupplier)
router.delete('/supplier/:code', authentication, supplierController.deleteSupplier)

module.exports = router;