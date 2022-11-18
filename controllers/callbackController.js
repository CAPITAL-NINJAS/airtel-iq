const catchAsync = require('../utils/catchAsync');

exports.postCallback = catchAsync(async (req, res, next) => {
  const data = req.body;

  console.log(data);

  res.status(200).json({
    status: 'success',
    data,
  });
});
