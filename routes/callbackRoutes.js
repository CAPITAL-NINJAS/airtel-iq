const express = require('express');
const cors = require('cors');

const callbackController = require('./../controllers/callbackController');

const router = express.Router();

router.route('/').post(cors(), callbackController.postCallback);

module.exports = router;
