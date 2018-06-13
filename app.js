/**
 * Module dependencies
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');

const apiRouter = require('./routes/auth');
const employeeRouter = require('./routes/employee');

/**
 * express initialization
 */
const app = express();

/**
 * MongoDB connection
 */
mongoose.connect('mongodb://localhost/healthvings')
  .then(() => {
    console.log('Connected to Database');
  }).catch((err) => {
    console.log('DATABASE Connection Failed', err);
  });

/**
 * Express middleware
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/healthvings')));
app.use('/', express.static(path.join(__dirname, 'dist/healthvings')));

/**
 * Routes and the error handler
 */

app.use('/api', apiRouter);
app.use('/api', employeeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
