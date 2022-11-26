const mongoose = require("mongoose");
var randomstring = require("randomstring");

const accountSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    custId: {
      type: String,
      unique: true,
      trim: true,
    },
    account_no: {
      type: String,
      trim: true,
      unique: true,
    },
    balance: {
      type: Number,
    },
    account_type: {
      type: String,
      enum: {
        values: [
          "Savings",
          "Current",
          "Salary",
          "Fixed Deposit",
          "Recurring Deposit",
          "NRI",
        ],
        message: "Please enter a valid account type",
      },
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

accountSchema.pre(/^find/, function (next) {
  this.populate({
    path: "customer_id",
    select: "first_name last_name email mobile_no",
  });

  next();
});

accountSchema.pre("save", function (next) {
  this.custId = randomstring.generate({
    length: 8,
    charset: "numeric",
  });

  this.account_no = randomstring.generate({
    length: 16,
    charset: "numeric",
  });

  next();
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
