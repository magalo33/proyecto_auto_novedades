import dotenv from "dotenv";
import Server from "./models/server";
import morgan from 'morgan';
import express from "express";


const winston = require('./winston/config');
dotenv.config();


const app = express();

app.use(morgan('combined', { stream: winston.stream }));

winston.info('You have successfully started working with winston and morgan');

const server = new Server();
server.listen();