const http = require('http');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 🎇 Shutting down...');
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);

  const options = {
    port,
    host,
  };

  const req = http.request(options);

  req.setHeader('content-type', 'application/json');

  req.end();
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 🎇 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
