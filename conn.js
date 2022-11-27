const { options } = require("./routes/authRoutes");
const whatsapp = require("./whatsapp/whatsapp");

exports.getData = async (data) => {
  const sessionId = data.sessionId;
  const fromMob = data.from;
  const toMob = data.to;
  const message = data.message;

  if (message.text.body == "Hii") {
    const res = { sessionId, fromMob, toMob, message };
    sendWelcome(res);
  }
};
const sendWelcome = (options) => {
  const message =
    "Hi,Glad to see you here /n Hope you are doing well 😃 /n/n Welcome to the Capital Ninjas😃 /n How may I help you?";
  options.message = message;
  whatsapp.sendOneText(options);
};
