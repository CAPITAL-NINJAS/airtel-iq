const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      unique: true,
    },
    transaction_medium: {
      type: String,
      enum: {
        values: [
          'NEFT',
          'RTGS',
          'IMPS',
          'UPI',
          'Debit Card',
          'Credit Card',
          'AEPS',
          'Cheque',
          'Demand Draft',
        ],
        message: 'Please a enter a valid transaction medium',
      },
    },
    transaction_type: {
      type: String,
      enum: {
        values: ['Debit', 'Credit'],
        message: 'Please enter a valid transaction type',
      },
    },
    transaction_status: {
      type: String,
      enum: {
        values: ['Initiated', 'Active', 'Completed', 'Aborted'],
        message: 'Please enter a valid transaction status',
      },
      default: 'Initiated',
    },
    from_account_no: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account',
    },
    to_account_no: {
      type: mongoose.Schema.ObjectId,
      ref: 'Account',
    },
    date_issued: {
      type: Date,
      default: Date.now(),
    },
    amount: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

transactionSchema.pre('save', function (next) {
  this.transaction_id = uuidv4();

  next();
});

transactionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'from_account_no',
    select: 'account_no balance account_type -customer_id -_id',
  }).populate({
    path: 'to_account_no',
    select: 'account_no balance account_type -customer_id -_id',
  });

  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
