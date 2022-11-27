const whatsapp = require('./whatsapp/whatsapp');

exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (sessionId && fromMob && toMob && message) {
    const res = { sessionId, from: toMob, to: fromMob, message };

    if (message.text) {
      if (message.text.body == 'Hii') {
        sendWelcome(res);
      }
    } else if (message.interactive) {
      if (message.interactive.button_reply) {
        if (message.interactive.button_reply.title == 'English') {
          sendEnglishReply(res);
          sendServices(res);
        } else if (message.interactive.button_reply.title == 'Hindi') {
          sendHindiReply(res);
          sendServices(res);
        }
      } else if (message.interactive.list_reply) {
        if (message.interactive.list_reply.title == 'Banking Services') {
          sendBankingServices(res);
        }

        if (message.interactive.list_reply.title == 'Financial Services') {
          sendFinanceServices(res);
        }

        if (message.interactive.list_reply.title == 'Insurance Services') {
          sendInsuranceServices(res);
        }

        if (message.interactive.list_reply.title == 'Wealth Management') {
          sendWealthManagement(res);
        }

        if (message.interactive.list_reply.title == 'Stocks') {
          sendStocksMessage(res);
        }

        if (message.interactive.list_reply.title == 'Forex') {
          sendForexMessage(res);
        }
      }
    }
  }
};

// Send Welcome Message
const sendWelcome = (options) => {
  const message = {
    text: `Hi, Welcome to the Capital 🏯 of  Capital Ninjas😃. \n\nPlease select your language.`,
  };

  const mediaAttachment = {
    type: 'IMAGE',
    id: 672147101199754,
  };

  const buttons = [
    {
      tag: 'L-01',
      title: 'English',
    },
    {
      tag: 'L-02',
      title: 'Hindi',
    },
  ];

  options.message = message;
  options.mediaAttachment = mediaAttachment;
  options.buttons = buttons;

  whatsapp.sendInteractiveBtn(options);
};

// Send English Button Reply
const sendEnglishReply = (options) => {
  const message = {
    text: `Great how may I help you`,
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

// Send Hindi Button Reply
const sendHindiReply = (options) => {
  const message = {
    text: `Sorry, currently I am not trained on Hindi\nLet's continue in English`,
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

// Send Overall Services to Customer
const sendServices = (options) => {
  const message = {
    text: 'Here are the services provided by me',
  };

  const list = {
    heading: 'Services',
    options: [
      {
        tag: 'S-01',
        title: 'Banking Services',
        description: 'Check account balance | Get mini statement & more',
      },
      {
        tag: 'S-02',
        title: 'Financial Services',
        description: 'Wealth management | Financial advisory & more',
      },
      {
        tag: 'S-03',
        title: 'Insurance Services',
        description:
          'Buy | Renew | Get details | Terminate | Installment & more',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Banking Services options to customer
const sendBankingServices = (options) => {
  const message = {
    text: 'Banking Services available for you on Whatsapp!',
  };

  const list = {
    heading: 'Banking Services',
    options: [
      {
        tag: 'B-01',
        title: 'Check bank balance',
        description: 'Know your bank balance instantly',
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

// Send Financial Services options to customer
const sendFinanceServices = (options) => {
  const message = {
    text: 'We provide services of financial advisor, Portfolio Management, Investment Consultant',
  };

  const list = {
    heading: 'Financial Services',
    options: [
      {
        tag: 'F-01',
        title: 'Wealth Management',
        description: 'We take care of your Finance.',
      },
      {
        tag: 'F-02',
        title: 'Financial Advisory',
        description:
          'A team of qualified professionals that provide advice on how to manage money and assets efficiently.',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Insurance Services to customer
const sendInsuranceServices = (options) => {
  const message = {
    text: 'We provide all types of Insurance Services',
  };

  const list = {
    heading: 'Insurance Services',
    options: [
      {
        tag: 'I-01',
        title: 'Buy New Insurance',
        description: 'Insure your n your Family Future ',
      },
      {
        tag: 'I-02',
        title: 'Find details',
        description: 'Get Existing Insurance Details',
      },
      {
        tag: 'I-03',
        title: 'Pay Installment',
        description: 'Pay EMI for Insurance',
      },
      ,
      {
        tag: 'I-04',
        title: 'Renew Policy',
        description: 'Renew Existing Policy',
      },
      ,
      {
        tag: 'I-05',
        title: 'Drop Insurance',
        description: 'Stop policy, Claim Insurance',
      },
      ,
      {
        tag: 'I-06',
        title: 'Raise Claim',
        description: 'Claim for Existing Policy',
      },
      ,
      {
        tag: 'I-07',
        title: 'Claim status',
        description: 'Check updates on your claim',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send wealth management services options
const sendWealthManagement = (options) => {
  const message = {
    text: 'Wealth management is key for successful wealth creation.',
  };

  const list = {
    heading: 'Wealth Management',
    options: [
      {
        tag: 'W-01',
        title: 'Mutual Funds',
        description:
          'Mutual funds are an ideal investment guide that help you plan for your life goals.',
      },
      {
        tag: 'W-02',
        title: 'Stocks',
        description:
          'Platform where buyers and sellers meet to exchange equity shares of public corporations.',
      },
      {
        tag: 'W-03',
        title: 'IPO',
        description:
          "Table where company's ownership is transistioning from private ownership to public ownership.",
      },
      {
        tag: 'W-04',
        title: 'Forex',
        description: 'Global marketplace for exchanging national currencies.',
      },
      {
        tag: 'W-05',
        title: 'Tax-Calculators',
        description: 'Calculates all the tax enities.',
      },
      {
        tag: 'W-06',
        title: 'Bonds',
        description: 'A debt security, similar to an IOU.',
      },
      {
        tag: 'W-07',
        title: 'Gold',
        description: 'Gold the oldest and best method of investment.',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Stocks Message to customer
const sendStocksMessage = (options) => {
  const message = {
    text: 'A way for exponential growth.',
  };

  const list = {
    heading: 'Stocks',
    options: [
      {
        tag: 'ST-01',
        title: 'Equity',
        description:
          'Measures of a company totals assets minus total liabilities.',
      },
      {
        tag: 'ST-02',
        title: 'Debts',
        description: 'Amount owned by the borrower to the lender.',
      },
      {
        tag: 'ST-03',
        title: 'Futures',
        description:
          'A type of derivative contract agreement to buy or sell a specific commodity asset or security at a set future date for a set price.',
      },
      {
        tag: 'ST-04',
        title: 'Options',
        description:
          'A type of derivative contract agreement to buy or sell a specific commodity asset or security at a set expiry date for a set price.',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Forex message to customer
const sendForexMessage = (options) => {
  const message = {
    text: 'Global marketplace for exchanging national currencies.',
  };

  const buttons = [
    {
      tag: 'FX-01',
      title: 'Foreign Exchange',
    },
    {
      tag: 'FX-02',
      title: 'Foreign Currency',
    },
  ];

  options.message = message;
  options.buttons = buttons;

  whatsapp.sendInteractiveBtn(options);
};
