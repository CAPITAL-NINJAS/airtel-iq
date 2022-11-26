const fast2sms = require('fast-two-sms');
const otpGenerator = require('otp-generator');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createSendOtp = catchAsync(async (req, res, next) => {
  const mobile = req.body.mob_no;

  if (!mobile) {
    next(new AppError('Please provide a mobile number', 400));
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const options = {
    authorization: process.env.FAST2SMS_API_KEY,
    message: `${otp} is the OTP for WhatsApp Banking Registration. Do not share this with anyone. If not requested, please ignore.`,
    numbers: [mobile],
  };

  fast2sms
    .sendMessage(options)
    .then((response) => {
      console.log(response);

      res.status(200).json({
        status: 'success',
        message: 'SMS OTP Code Sent Successfully',
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'error',
        message: `Some error has taken place : ${err}`,
      });
    });
});
