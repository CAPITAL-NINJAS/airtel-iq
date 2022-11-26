const Customer = require('./../models/customerModel');

const fast2sms = require('fast-two-sms');
const otpGenerator = require('otp-generator');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createSendOtp = catchAsync(async (req, res, next) => {
  const mobile = req.body.mob_no;

  if (!mobile) {
    next(new AppError('Please provide a mobile number', 400));
  }

  const currentOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const options = {
    authorization: process.env.FAST2SMS_API_KEY,
    message: `${currentOtp} is the OTP for WhatsApp Banking Registration. Do not share this with anyone. If not requested, please ignore.`,
    numbers: [mobile],
  };

  await Customer.findOneAndUpdate(
    { mobile_no: mobile },
    { otp: currentOtp },
    { new: true }
  );

  await fast2sms
    .sendMessage(options)
    .then(() => {
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

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const uotp = req.body.otp;
  if (!uotp) {
    return next(new AppError('Please provide a otp number', 400));
  }

  const user = await Customer.findOne({ mobile_no: req.body.mob_no });

  if (uotp != user.otp) {
    return next(new AppError('Otp match not found, Provide a valid otp', 404));
  }

  await Customer.findOneAndUpdate(
    { mobile_no: req.body.mob_no },
    { otp: null },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Otp verified',
  });
});
