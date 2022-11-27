// const fs = require("fs");
const xlsx = require('json-as-xlsx');

const Account = require('../models/accountModel');
const Customer = require('../models/customerModel');
const Transaction = require('../models/transactionModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getministatement = catchAsync(async (req, res, next) => {
  const mobile = req.params.mob_no;

  const user = await Customer.findOne({ mobile_no: mobile });
  if (!user) {
    return next(new AppError('User is not present', 404));
  }

  const account = await Account.findOne({ customer_id: user._id });
  if (!user) {
    return next(new AppError('Account not found', 404));
  }

  const transaction = await Transaction.find({
    from_account_no: account._id,
  }).limit(5);
  if (!user) {
    return next(new AppError('Transaction not found,404'));
  }

  const data = [
    {
      sheet: 'mini_statement',
      columns: [
        { label: 'Transaction_Id', value: 'transaction_id' },
        { label: 'Date', value: 'date_issued' }, // Top level data
        { label: 'Type', value: 'transaction_type' }, // Custom format
        { label: 'From_Acc', value: 'from_account_no.account_no' },
        { label: 'To_Acc', value: 'to_account_no.account_no' },
        { label: 'Medium', value: 'transaction_medium' },
        { label: 'Status', value: 'transaction_status' },
        { label: 'Amount', value: 'amount' },
        { label: 'Balance', value: 'from_account_no.balance' },
      ],
      content: transaction,
    },
  ];

  const settings = {
    fileName: 'Mini_Statement', // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  xlsx(data, settings);

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

exports.getBalance = catchAsync(async (req, res, next) => {
  const mobile = req.body.mob_no;

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
