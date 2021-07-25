"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const winston = require('./winston/config');
dotenv_1.default.config();
const app = express_1.default();
app.use(morgan_1.default('combined', { stream: winston.stream }));
winston.info('You have successfully started working with winston and morgan');
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map