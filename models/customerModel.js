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
    country: String,
    state: String,
    city: String,
    description: {
      type: String,
      trim: true,
    },
    pincode: {
      type: Number,
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  mobile_no: {
    type: Number,
    unique: true,
  },
  pan_no: {
    type: String,
    unique: true,
    maxlength: 10,
  },
  aadhar_no: {
    type: Number,
    unique: true,
  },
  dob: Date,
  photo: {
    type: String,
    default: 'default.jpg',
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
