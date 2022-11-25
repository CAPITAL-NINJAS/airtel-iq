const Customer = require('../models/customerModel');
const factory = require('./handlerFactory');

exports.getAllCustomers = factory.getAll(Customer);
exports.createCustomer = factory.createOne(Customer);

exports.getCustomer = factory.getOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);
