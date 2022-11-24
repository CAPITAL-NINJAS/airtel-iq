const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  address: {
    country: {
      type: String,
      //   Test Commit
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
