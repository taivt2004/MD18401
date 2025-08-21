const express = require('express');
const router = express.Router();
const brandController = require('../../controller/brandController/brand_controller');

router.use((req, res, next) => {
    console.log('Route /brands hit:', req.method, req.url);
    next();
});

router.get('/all', brandController.getAllBrands);
router.post('/add', brandController.addBrand);

module.exports = router;