const axios = require('axios');
const whatsapp = require('./whatsapp/whatsapp');
const banking = require('./flow/banking');
const finance = require('./flow/finance');
const insurance = require('./flow/insurance');

const welcome_intent = [
  'hey',
  'hello',
  'hi',
  'Hi',
  'Hello',
  'Hey',
  'hii',
  'Hii',
  'Good morning',
  'Good afternoon ',
  'Good evening ',
  'goodmorning',
  'goodafternoon',
  'goodevening',
  'Menu',
  'menu',
  'Start',
  'start',
  'start bot',
  'Start bot',
];

const stop_intent = [
  'stop',
  'Stop',
  'end',
  'End',
  'bye',
  'Bye',
  'stop bot',
  'Stop bot',
  'end bot',
  'End bot',
  'stop chat',
  'endchat',
];

// Get message from user
exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (sessionId && fromMob && toMob && message) {
    const res = { sessionId, from: toMob, to: fromMob, message };

    if (message.text) {
      if (welcome_intent.includes(message.text.body)) {
        sendWelcome(res);
      } else if (message.text.body.length == 6) {
        const otp = parseInt(message.text.body);

        console.log('Inside otp');
        console.log(otp);

        const otpRes = await axios.post(
          'https://capital-ninjas.onrender.com/api/v1/auth/verifyOtp',
          {
            mob_no: fromMob.slice(2) * 1,
            otp: otp,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'null',
            },
          }
        );

        if (!otpRes) {
          sendErrorReply(res);
          sendWelcome(res);
        }

        console.log(otpRes);

        if (otpRes.status == 200) {
          const balanceRes = await axios.post(
            'https://capital-ninjas.onrender.com/api/v1/accounts/getBalance',
            {
              mob_no: fromMob.slice(2) * 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'null',
              },
            }
          );

          console.log(balanceRes.data);

          if (!balanceRes) {
            sendErrorReply(res);
            sendWelcome(res);
          }

          banking.showBalance(balanceRes.data.balance, res);
        }
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
          banking.sendBankingServices(res);
        } else if (
          message.interactive.list_reply.title == 'Check Account Balance'
        ) {
          axios({
            method: 'post',
            url: 'https://capital-ninjas.onrender.com/api/v1/auth/createOtp',
            data: {
              mob_no: fromMob.slice(2) * 1,
            },
          })
            .then((response) => {
              console.log(response);
            })
            .catch((err) => {
              sendErrorReply(res);
              sendWelcome(res);
            });

          banking.requestOtp(res);
        } else if (
          message.interactive.list_reply.title == 'Financial Services'
        ) {
          finance.sendFinanceServices(res);
        } else if (
          message.interactive.list_reply.title == 'Insurance Services'
        ) {
          insurance.sendInsuranceServices(res);
        } else if (
          message.interactive.list_reply.title == 'Wealth Management'
        ) {
          finance.sendWealthManagement(res);
        } else if (message.interactive.list_reply.title == 'Stocks') {
          finance.sendStocksMessage(res);
        } else if (message.interactive.list_reply.title == 'Forex') {
          finance.sendForexMessage(res);
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
    text: 'Great how may I help you',
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

// Send Error Response to user
const sendErrorReply = (options) => {
  const message = {
    text: 'Sorry I cannot understand this command\n\nPlease choose from the below menu 👇',
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
