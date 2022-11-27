const fetch = require('node-fetch');
const axios = require('axios');
const whatsapp = require('./whatsapp/whatsapp');

const connectRasa = async (options) => {
  //   const response = await axios
  //     .post('http://127.0.0.1:5005/webhooks/rest/webhook', options, {
  //       Headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  const response = fetch('http://127.0.0.1:5005/webhooks/rest/webhook', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
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
