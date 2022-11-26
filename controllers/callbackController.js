const catchAsync = require('../utils/catchAsync');
const { getData } = require('./../connection');

exports.postCallback = catchAsync(async (req, res, next) => {
  const data = req.body;

  console.log(data);
  console.log(data.message.text.body);

  // getData(data);

  res.status(200).json({
    status: 'success',
    data,
  });
});
