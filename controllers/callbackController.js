const catchAsync = require('../utils/catchAsync');
const { getData } = require('./../connection');

exports.postCallback = catchAsync(async (req, res, next) => {
  const data = req.body;

  getData(data);

  res.status(200).json({
    status: 'success',
    data,
  });
});
