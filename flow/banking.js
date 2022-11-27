const whatsapp = require('./../whatsapp/whatsapp');

// Send Banking Services options to customer
exports.sendBankingServices = (options) => {
  const message = {
    text: 'Banking Services available for you on Whatsapp!',
  };

  const list = {
    heading: 'Banking Services',
    options: [
      {
        tag: 'B-01',
        title: 'Check Account Balance',
        description: 'Know your account balance instantly',
      },
      {
        tag: 'B-02',
        title: 'Request Mini Statement',
        description: 'Raise instant request for Account Statement',
      },
      {
        tag: 'B-03',
        title: 'Find Cheque Status',
        description: 'Know your Issued Cheque Status',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Request otp from customer
exports.requestOtp = (options) => {
  const message = {
    text: 'To get your Account Balance.\nPlease enter the otp sent to your mobile number',
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

// Send balance to Customer
exports.showBalance = (balance, options) => {
  const message = {
    text: `Your Account Balance is : ${balance}`,
  };

  options.message = message;
  whatsapp.sendOneText(options);
};
