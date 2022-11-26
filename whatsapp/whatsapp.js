const axios = require("axios");
const catchAsync = require("./../utils/catchAsync");
const dotenv = require("dotenv");

dotenv.config({ path: "./../.env" });

// 1)send text message to single recipient
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
exports.sendOneText = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    "https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/text",
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "Text message to single recipient has been sent",
  });
});

// 2) send interactive message with list to single recipient
/*
{
  "sessionId": "<session-id>",
  "to": "<recipient-whatsapp-id>",
  "from": "<source-whatsapp-id>",
  "message": {
      "text": "<message-content>"
  },
  "list": {
      "heading": "<list-heading>",
      "options": [
          {
              "tag": "<option-tag-1>",
              "title": "<option-title>",
              "description": "<option-description>"
          },
          {
              "tag": "<option-tag-2>",
              "title": "<option-title>",
              "description": "<option-description>"
          }
      ]
  }
}
*/
exports.sendInteractiveList = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    "https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/list",
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "Text interactive message list  to single recipient has been sent",
  });
});

// 3)send interactive message with buttons to single recipient
/*
{
    "sessionId": "<session-id>",
    "to": "<recipient-whatsapp-id>",
    "from": "<source-whatsapp-id>",
    "mediaAttachment": {
        "type": "IMAGE",
        "id": "<media-id>",
        "caption": "<caption>"
    },
    "message": {
        "text": "<message-content>"
    },
    "buttons": [
        {
            "tag": "<tag-1>",
            "title": "<button-title1>"
        },
        {
            "tag": "<tag-2>",
            "title": "<button-title2>"
        }
    ]
}

*/

exports.sendInteractiveBtn = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    "https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/send/interactive/buttons",
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message:
      "Text interactive message button to single recipient has been sent",
  });
});

// 4)upload-media

/*
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('/path/to/file'));
data.append('type', 'IMAGE');
data.append('businessId', '<business-id>');
*/
exports.UploadMedia = catchAsync(async (req, res, next) => {
  const response = await axios.post(
    "https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/session/media",
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "Media has been uploaded",
  });
});

// 5)download media

exports.DownloadMedia = catchAsync(async (req, res, next) => {
  const response = await axios.get(
    "https://iqwhatsapp.airtel.in:443/gateway/airtel-xchange/basic/whatsapp-manager/v1/download/media?mediaId=<media-id>&businessId=<business-id>",
    req.body.options,
    {
      auth: {
        username: process.env.KONG_USER,
        password: process.env.KONG_PASS,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "Media has been downloaded",
  });
});
