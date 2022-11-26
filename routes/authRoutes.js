const express = require("express");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/createOtp", authController.createSendOtp);
router.post("/verifyOtp", authController.verifyOtp);

module.exports = router;
