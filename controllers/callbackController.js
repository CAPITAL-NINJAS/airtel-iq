const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { v4: uuid4 } = require('uuid');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (sessionId) => {
  return jwt.sign(
    { id: `${sessionId}_${Date.now()}` },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (sessionId, statusCode, req, res) => {
  const token = signToken(sessionId);

  res.status(statusCode).json({
    status: 'success',
    token,
    sessionId,
  });
};

let sid;
exports.getCallback = (req, res, next) => {
  const sessionId = uuid4();
  sid = sessionId;

  createSendToken(sessionId, 200, req, res);
};

exports.postCallback = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please provide token'));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const sessionId = decoded.id.split('_')[0];
  if (sessionId != sid) {
    return next(new AppError('Session expired', 401));
  }

  const body = req.body;

  res.status(200).json({
    status: 'success',
    body,
  });
});
