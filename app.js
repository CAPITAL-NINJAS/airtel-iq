const path = require('path');
const express = require('express');
const morgan = require('morgan');

// Requiring files
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const callbackRouter = require('./routes/callbackRoutes');
const customerRouter = require('./routes/customerRoutes');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');

// Start Express App
const app = express();
app.enable('trust-proxy');

// Setting view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1.) Global Middlewares

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res, next) => {
  res.status(200).render('home');
});

// 2.) Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/callback', callbackRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/transactions', transactionRouter);

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
