const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.postCallback = catchAsync(async (req, res, next) => {
  let authHeader;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Basic')
  ) {
    authHeader = req.headers.authorization.split(' ')[1];
  }

  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic');
    return next(new AppError('You are not authenticated!', 401));
  }

  let auth = new Buffer.from(authHeader, 'base64').toString().split(':');

  const key = auth[0];
  const secret = auth[1];

  if (key == process.env.API_KEY && secret == process.env.API_SECRET) {
    const data = req.body;

    res.status(200).json({
      status: 'success',
      data,
    });
  } else {
    res.setHeader('WWW-Authenticate', 'Basic');
    return next(new AppError('You are not authenticated!', 401));
  }
});
