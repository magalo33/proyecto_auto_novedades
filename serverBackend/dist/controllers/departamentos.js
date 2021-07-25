"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartamento = exports.getDepartamentos = void 0;
const departamento_1 = __importDefault(require("../models/departamento"));
const utilities_1 = __importDefault(require("../utilities/utilities"));
const winston = require('../winston/config');
const getDepartamentos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body, uuid);
    uuid = uuid + "[METODO->getDepartamentos]";
    let departamentos = {};
    if (msg == "Ok") {
        try {
            departamentos = yield departamento_1.default.findAll({ order: ["iddepartamento"], logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            winston.info(uuid + "[OK]->consulta exitosa");
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos';
            winston.error(uuid + "[ERROR]->" + msg);
        }
    }
    else {
        errorRet = 1;
        winston.error(uuid + "[ERROR]->" + msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        departamentos
    });
});
exports.getDepartamentos = getDepartamentos;
const getDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body, uuid);
    uuid = uuid + "[METODO->getDepartamento]";
    let departamentos = {};
    if (msg == "Ok") {
        try {
            departamentos = yield departamento_1.default.findByPk(id, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            winston.info(uuid + "[OK]->consulta exitosa");
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos';
            winston.error(uuid + "[ERROR]->" + msg);
        }
    }
    else {
        errorRet = 1;
        winston.error(uuid + "[ERROR]->" + msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        departamentos
    });
});
exports.getDepartamento = getDepartamento;
//# sourceMappingURL=departamentos.js.map