const express = require('express');
const morgan = require('morgan');

// Requiring files
const callbackRouter = require('./routes/callbackRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Start Express App
const app = express();
app.enable('trust-proxy');

// 1.) Global Middlewares

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res, next) => {
  res.status(200).send('OK');
});

// 2.) Routes
app.use('/api/v1/callback', callbackRouter);

app.all('*', function (req, res, next) {
  next(
    new AppError(
      `Can't find the requested url ${req.originalUrl} on this server!`,
      404
    )
  );
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
