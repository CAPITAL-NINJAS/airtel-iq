const whatsapp = require('./whatsapp/whatsapp');

const connectRasa = async (options) => {
  //   const response = await axios.post(
  //     'http://127.0.0.1:5005/webhooks/rest/webhook',
  //     options,
  //     {
  //       Proxy: false,
  //     }
  //   );

  const response = await fetch('http://127.0.0.1:5005/webhooks/rest/webhook', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  return response;
};

const sendWhatsapp = async (options) => {
  whatsapp.sendOneText(options);
};

exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (sessionId && fromMob && toMob && message) {
    const options = {
      sender: sessionId,
      message: message.text.body,
    };

    const res = await connectRasa(options);

    if (res) {
      const response = {
        sessionId,
        fromMob,
        toMob,
        message: res.text,
      };

      sendWhatsapp(response);
    }
  }
};
