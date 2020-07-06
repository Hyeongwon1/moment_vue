require('dotenv').config();

import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import path  from 'path';
import morgan from 'morgan'
import moment from 'moment'
import response from './utils/response'
import v1Route from './routes/v1'

// jwt 토큰 middleware
import jwtMiddleware from './middlewares/jwt.middleware'
import { logger, stream } from './configs/winston'

import cors from 'cors';

var app = express();
app.use(cors());

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwtMiddleware)
app.use(express.static(path.join(__dirname, "public/static")));
app.use("/front/uploads", express.static("public/uploads"));
app.use(morgan('combined', {stream}));

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

  if (process.env.NODE_ENV === 'test') {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route
      },
      error: {
        message: apiError.message,
        stack: apiError.stack,
        status: apiError.status
      },
      user: req.user
    }

    logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')}`, errObj)
  } else {
    res.locals.message = apiError.message
    res.locals.error = apiError
  }

  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  return response(res, {
    message: apiError.message
  }, apiError.status)  
});

module.exports = app;
