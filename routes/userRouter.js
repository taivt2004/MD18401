const express = require('express');
const router = express.Router();
const userController = require('../controller/userController/userController');

// Routes
router.post('/dangki', userController.register);
router.post('/dangnhap', userController.login);
router.put('/capnhatprofile', userController.updateProfile);
router.post('/refreshtoken', userController.refreshToken);

module.exports = router;
