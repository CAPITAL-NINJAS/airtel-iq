const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Customer = require('./../../models/customerModel');
const Account = require('./../../models/accountModel');
const Transaction = require('./../../models/transactionModel');

dotenv.config({ path: './.env' });

const DB = process.env.DB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull!'));

// READ JSON FILE
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/customers.json`, 'utf-8')
);
const accounts = JSON.parse(
  fs.readFileSync(`${__dirname}/accounts.json`, 'utf-8')
);
const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/transactions.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Customer.create(customers, { validateBeforeSave: false });
    await Account.create(accounts, { validateBeforeSave: false });
    await Transaction.create(transactions);

    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Customer.deleteMany();
    await Account.deleteMany();
    await Transaction.deleteMany();

    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
