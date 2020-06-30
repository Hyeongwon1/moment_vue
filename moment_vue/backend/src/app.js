require('dotenv').config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require('cookie-parser');
var logger = require("morgan");

const bodyParser = require('body-parser');
const winston = require('./configs/db/logger')
var cors = require("cors");
const v1Route = require ("./routes/v1")

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public/static")));
app.use("/front/uploads", express.static("public/uploads"));
app.use(bodyParser.json());
app.use(logger('combined', {stream: winston.stream}));

// app.use(router)
app.use('/v1', v1Route)
app.use(require("connect-history-api-fallback")());



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  let apiError = err

  if (!err.status) {
    apiError = createError(err)
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");

  // render the error page
  return res.status(apiError.status)
    .json({message: apiError.message})
});

module.exports = app;
