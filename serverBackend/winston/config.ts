//import appRoot from 'app-root-path';
import winston from 'winston';
import moment from 'moment-timezone';

const now= new Date();
const ms = now.getTime();
const t = moment().tz('America/Bogota').format('YYYY-MM-DD');
const fn = './logs/log_'+t+'_'+ms+'.log';

const options = {
  file: {
    level: 'info',
    filename: fn,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

let logger:any;

if (process.env.logging === 'off') {
  logger = winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
} else {  
  logger = winston.createLogger({    
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message:string) {
    logger.info(message);
  },
};

module.exports = logger;