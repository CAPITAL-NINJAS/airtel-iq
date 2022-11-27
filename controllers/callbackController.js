const catchAsync = require("../utils/catchAsync");
const { getData } = require("./../conn");

exports.postCallback = catchAsync(async (req, res, next) => {
  const data = req.body;

  console.log(data);

  if (data) {
    getData(data);
  }

  res.status(200).json({
    status: "success",
    data,
  });
});
