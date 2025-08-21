const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/cate_controller.js/cate_controller.js');

router.use((req, res, next) => {
    console.log('Route /brands hit:', req.method, req.url);
    next();
});

router.get('/all', categoryController.getAllCates);
router.post('/add', categoryController.addCate);

module.exports = router;