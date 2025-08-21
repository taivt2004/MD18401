const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController/userController');

// Routes
router.post('/sign_up', userController.register);
router.post('/sign_in', userController.login);
router.post('/update_profile', userController.updateProfile);
router.post('/refresh_token', userController.refreshToken);

module.exports = router;
