const axios = require('axios');
const catchAsync = require('./../utils/catchAsync');
const dotenv = require('dotenv');

dotenv.config({ path: './../.env' });

// send text message to single recipient
/*
{
    "sessionId": "<session-id>",
    "to": "<recipient-whatsapp-id>",
    "from": "<source-whatsapp-id>",
    "message": {
        "text": "<message-content>"
    }
}
*/
exports.sendOne = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    'https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text',
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Text message to single recipient has been sent',
  });
});
