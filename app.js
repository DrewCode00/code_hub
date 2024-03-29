import { ExpressValidatorOptions } from "./node_modules/express-validator/index.d";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ExpressValidator = require("express-validator");
var bodyParser = require("body-parser");
var express = require("express");


var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


require('./passport');



var config = require('./config');
var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth');
var taskRoute = require('./routes/task');


mongoose.connect(config.dbConnString);
global.User = require('./models/user');
global.Task = require('./models/task');
 


var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ExpressValidator());
app.use(cookieParser());
app.use(session({
  secret: config.sessionKey,
    resave: false,
    saveUninitialized: true,
    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res, next){
  if(req.isAuthenticated()){
    res.locals.user =req.user;

  }
  next();


});

app.use('/', indexRoute);
app.use('/', authRoute);
app.use('/', taskRoute);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
