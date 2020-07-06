const appRoot = require("app-root-path");
const winston = require("winston");
const process = require("process");

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  file: {
    // 로그 파일 저장시... 작성
    /* level: 'info',
    filename: `${appRoot}/logs/winston-test.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'winston-test' }),
      timestamp(),
      myFormat    // log 출력 포맷
    ) */
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(label({ label: "express_server" }), timestamp(), myFormat),
  },
};
//파일로 떨굴시
/* let logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
  ],
  exitOnError: false, 
}); */

let logger = new winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

// if(process.env.NODE_ENV !== 'production'){
//   logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
// }

logger.stream = {
  write: function (message, encoding) {
    logger.info(message); // 단순히 message를 default 포맷으로 출력
  },
};

module.exports = logger;
