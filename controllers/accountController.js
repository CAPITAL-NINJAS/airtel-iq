const Account = require('../models/accountModel');
const Customer = require('../models/customerModel');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getBalance = catchAsync(async (req, res, next) => {
  const mobile = req.params.mob_no;

  const user = await Customer.findOne({ mobile_no: mobile });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const account = await Account.findOne({ customer_id: user._id });
  if (!account) {
    return next(new AppError('Account not found', 404));
  }

  const balance = account.balance;

  res.status(200).json({
    status: 'success',
    data: {
      balance,
    },
  });
});

exports.getAllAccounts = factory.getAll(Account);
exports.createAccount = factory.createOne(Account);

exports.getAccount = factory.getOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
