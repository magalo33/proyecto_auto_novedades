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
exports.getCiudadPorDepartamento = exports.getCiudad = exports.getCiudades = void 0;
const ciudad_1 = __importDefault(require("../models/ciudad"));
const utilities_1 = __importDefault(require("../utilities/utilities"));
const winston = require('../winston/config');
const getCiudades = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body, uuid);
    uuid = uuid + "[METODO->getCiudades]";
    let ciudades = {};
    if (msg == "Ok") {
        try {
            ciudades = yield ciudad_1.default.findAll({ order: ["idciudad"], logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
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
        ciudades
    });
});
exports.getCiudades = getCiudades;
const getCiudad = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body, uuid);
    uuid = uuid + "[METODO->getCiudad]";
    let ciudad = {};
    if (msg == "Ok") {
        try {
            ciudad = yield ciudad_1.default.findByPk(id, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (ciudad) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                errorRet = 1;
                msg = 'No se encontro ciudad relacionada al parametro de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
                ciudad = {};
            }
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
        ciudad
    });
});
exports.getCiudad = getCiudad;
const getCiudadPorDepartamento = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body, uuid);
    uuid = uuid + "[METODO->getCiudadPorDepartamento]";
    let ciudades = {};
    if (msg == "Ok") {
        try {
            ciudades = yield ciudad_1.default.findAll({ where: { iddepartamento: id }, order: ["descripcion"], logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (ciudades) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                errorRet = 1;
                msg = 'No se encontro ciudad relacionada al parametro de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
                ciudades = {};
            }
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
        ciudades
    });
});
exports.getCiudadPorDepartamento = getCiudadPorDepartamento;
//# sourceMappingURL=ciudades.js.map