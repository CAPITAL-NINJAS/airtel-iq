const whatsapp = require('./whatsapp/whatsapp');

exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (sessionId && fromMob && toMob && message) {
    const res = { sessionId, from: toMob, to: fromMob, message };

    if (message.text.body == 'Hii') {
      sendWelcome(res);
    } else if (
      message.interactive.button_reply &&
      message.interactive.button_reply.title == 'English'
    ) {
      sendEnglishReply(res);
      sendServices(res);
    } else if (
      message.interactive.button_reply &&
      message.interactive.button_reply.title == 'Hindi'
    ) {
      sendHindiReply(res);
      sendServices(res);
    }
  }
};

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
      tag: 1,
      title: 'English',
    },
    {
      tag: 2,
      title: 'Hindi',
    },
  ];

  options.message = message;
  options.mediaAttachment = mediaAttachment;
  options.buttons = buttons;

  whatsapp.sendInteractiveBtn(options);
};

const sendEnglishReply = (options) => {
  const message = {
    text: `Great how may I help you`,
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

const sendHindiReply = (options) => {
  const message = {
    text: `Sorry, currently I am not trained on Hindi\n
            let's continue in English`,
  };

  options.message = message;
  whatsapp.sendOneText(options);
};

const sendServices = (options) => {
  const message = {
    text: 'Here are the services provided by me',
  };

  const list = {
    heading: 'Services',
    options: [
      {
        tag: 'Banking ',
        title: 'Banking Services',
        description: 'Check account balance | Get mini statement & more',
      },
      {
        tag: 'Finance',
        title: 'Financial Services',
        description: 'Wealth management | Financial advisory & more',
      },
      {
        tag: 'Insurance',
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
