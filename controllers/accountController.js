const Account = require('../models/accountModel');
const factory = require('./handlerFactory');

exports.getAllAccounts = factory.getAll(Account);
exports.createAccount = factory.createOne(Account);

exports.getAccount = factory.getOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);
