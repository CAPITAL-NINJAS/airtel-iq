const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/otp', authController.createSendOtp);

module.exports = router;
