var createError     = require('http-errors');
var express         = require('express');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var path            = require('path');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var cors	          = require('cors')
var usersRouter     = require('./routes/users');
var puppRouter     = require('./routes/pupp');
var momentRouter    = require('./routes/moment');

var app = express();
app.use(cors());
app.use(require('connect-history-api-fallback')());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public/static')));
app.use('/uploads', express.static('public/uploads'));
app.use('/image', express.static('public/image'));
app.use('/font', express.static('public/font'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/', indexRouter);
app.use('/moment/users', usersRouter);
app.use('/moment/pupp', puppRouter);
app.use('/moment', momentRouter);


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
