const express = require('express');
const callbackController = require('./../controllers/callbackController');

const router = express.Router();

router
  .route('/')
  .get(callbackController.getCallback)
  .post(callbackController.postCallback);

module.exports = router;
