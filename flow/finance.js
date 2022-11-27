exports.sendFinanceServices = (options) => {
  const message = {
    text: "We provide services of financial advisor, Portfolio Management, Investment Consultant",
  };

  const list = {
    heading: "Financial Services",
    options: [
      {
        tag: "F-01",
        title: "Wealth Management",
        description: "We take care of your Finance.",
      },
      {
        tag: "F-02",
        title: "Financial Advisory",
        description:
          "A team of qualified professionals that provide advice on how to manage money and assets efficiently.",
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send wealth management services options
exports.sendWealthManagement = (options) => {
  const message = {
    text: "Wealth management is key for successful wealth creation.",
  };

  const list = {
    heading: "Wealth Management",
    options: [
      {
        tag: "W-01",
        title: "Mutual Funds",
        description:
          "Mutual funds are an ideal investment guide that help you plan for your life goals.",
      },
      {
        tag: "W-02",
        title: "Stocks",
        description:
          "Platform where buyers and sellers meet to exchange equity shares of public corporations.",
      },
      {
        tag: "W-03",
        title: "IPO",
        description:
          "Table where company's ownership is transistioning from private ownership to public ownership.",
      },
      {
        tag: "W-04",
        title: "Forex",
        description: "Global marketplace for exchanging national currencies.",
      },
      {
        tag: "W-05",
        title: "Tax-Calculators",
        description: "Calculates all the tax enities.",
      },
      {
        tag: "W-06",
        title: "Bonds",
        description: "A debt security, similar to an IOU.",
      },
      {
        tag: "W-07",
        title: "Gold",
        description: "Gold the oldest and best method of investment.",
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Stocks Message to customer
exports.sendStocksMessage = (options) => {
  const message = {
    text: "A way for exponential growth.",
  };

  const list = {
    heading: "Stocks",
    options: [
      {
        tag: "ST-01",
        title: "Equity",
        description:
          "Measures of a company totals assets minus total liabilities.",
      },
      {
        tag: "ST-02",
        title: "Debts",
        description: "Amount owned by the borrower to the lender.",
      },
      {
        tag: "ST-03",
        title: "Futures",
        description:
          "A type of derivative contract agreement to buy or sell a specific commodity asset or security at a set future date for a set price.",
      },
      {
        tag: "ST-04",
        title: "Options",
        description:
          "A type of derivative contract agreement to buy or sell a specific commodity asset or security at a set expiry date for a set price.",
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};

// Send Forex message to customer
exports.sendForexMessage = (options) => {
  const message = {
    text: "Global marketplace for exchanging national currencies.",
  };

  const buttons = [
    {
      tag: "FX-01",
      title: "Foreign Exchange",
    },
    {
      tag: "FX-02",
      title: "Foreign Currency",
    },
  ];

  options.message = message;
  options.buttons = buttons;

  whatsapp.sendInteractiveBtn(options);
};
