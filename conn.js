const whatsapp = require('./whatsapp/whatsapp');

exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (sessionId && fromMob && toMob && message) {
    if (message.text.body == 'Hii') {
      const res = { sessionId, from: toMob, to: fromMob, message };
      sendWelcome(res);
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
