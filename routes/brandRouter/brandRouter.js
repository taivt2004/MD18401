const express = require('express');
const router = express.Router();
const brandController = require('../../controller/brandController/brand_controller');



router.get('/all', brandController.getAllBrands);
router.post('/add', brandController.addBrand);

module.exports = router;