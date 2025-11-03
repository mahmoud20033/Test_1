const express = require('express');
const router = express.Router();
const scrapController = require('../Controllers/Scrap');
const authentication = require('../middleware/auth');

router.get('/Scrap', scrapController.getallScrap)
router.post('/Scrap', authentication, scrapController.createScrap)
router.put('/Scrap/:code', authentication, scrapController.updateScrap)
router.delete('/Scrap/:code', authentication, scrapController.deleteScrap)

module.exports = router;