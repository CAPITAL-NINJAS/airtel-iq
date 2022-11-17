const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // RENDERED WEBSITE
    console.error('ERROR 🎇', err);
    res.status(err.statusCode).send('🎇 OOPS! An Error Occured');
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // Programming or other unknown error: don't leak error details
    } else {
      // 1.) Log Error
      console.error('ERROR 🎇', err);

      // 2.) Send Generic Message
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  } else {
    // RENDERED WEBSITE
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).send('🎇 OOPS! An Error Occured');

      // Programming or other unknown error: don't leak error details
    } else {
      // 1.) Log Error
      console.error('ERROR 🎇', err);

      // 2.) Send Generic Message
      res.status(err.statusCode).send('🎇 Something went wrong');
    }
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
