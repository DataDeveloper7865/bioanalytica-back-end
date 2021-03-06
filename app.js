var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var db = require('./db');
var { User } = require('./db/models/');
var cors = require('cors');

//create store for sessions to persis in database
var sessionStore = new SequelizeStore({ db });

var { json, urlencoded } = express;

var shirtsRouter = require('./routes/api/shirts');
var usersRouter = require('./routes/auth/index');
// const { Sequelize } = require('sequelize/types');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Use the following utilites
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(function (req, res, next) {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findOne({
        where: { id: decoded.id },
      }).then((user) => {
        req.user = user;
        return next();
      });
    });
  } else {
    return next();
  }
});


// Require all routes
app.use('/shirts', shirtsRouter);
app.use('/users', usersRouter);

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

module.exports = { app, sessionStore };
