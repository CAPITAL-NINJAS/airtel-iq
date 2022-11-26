const axios = require('axios');
const whatsapp = require('./whatsapp/whatsapp');

const connectRasa = async (options) => {
  const response = await axios.post(
    'http://127.0.0.1:5005/webhooks/rest/webhook',
    options,
    {
      Proxy: false,
    }
  );

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

  const options = {
    sender: sessionId,
    message: message.text.body,
  };

  const res = await connectRasa(options);

  const response = {
    sessionId,
    fromMob,
    toMob,
    message: res.text,
  };

  sendWhatsapp(response);
};
