const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const indexRouter = require('./routes/index');

mongoose.connect("mongodb+srv://rihan:rihan.99@cluster0-evao7.mongodb.net/ecommerce",
  { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => { console.log("DataBase Connected") })
  .catch((error) => { console.log("DataBase Not Connected" + error) });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader(
    'Access-control-Allow-Headers',
    'Origin, X-requested-with, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
})

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
