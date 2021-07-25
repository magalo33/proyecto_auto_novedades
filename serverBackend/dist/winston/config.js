"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import appRoot from 'app-root-path';
const winston_1 = __importDefault(require("winston"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const now = new Date();
const ms = now.getTime();
const t = moment_timezone_1.default().tz('America/Bogota').format('YYYY-MM-DD');
const fn = './logs/log_' + t + '_' + ms + '.log';
const options = {
    file: {
        level: 'info',
        filename: fn,
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
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
let logger;
if (process.env.logging === 'off') {
    logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File(options.file),
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
}
else {
    logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File(options.file),
            new winston_1.default.transports.Console(options.console),
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
}
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write(message) {
        logger.info(message);
    },
};
module.exports = logger;
//# sourceMappingURL=config.js.map