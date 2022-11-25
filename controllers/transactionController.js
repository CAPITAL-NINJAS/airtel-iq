const Transaction = require('../models/transactionModel');
const factory = require('./handlerFactory');

exports.getAllTransactions = factory.getAll(Transaction);
exports.createTransaction = factory.createOne(Transaction);

exports.getTransaction = factory.getOne(Transaction);
exports.updateTransaction = factory.updateOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);
