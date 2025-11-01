const express = require('express');
const router = express.Router();
const scrapController = require('../Controllers/Scrap');
const authontication = require('../middleware/auth');

router.get('/Scrap', scrapController.getallScrap)
router.post('/Scrap', scrapController.createScrap)
router.put('/Scrap/:code', authontication, scrapController.updateScrap)
router.delete('/Scrap/:code', authontication, scrapController.deleteScrap)

module.exports = router;