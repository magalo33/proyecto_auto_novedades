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
exports.validarLogin = exports.token = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const security_1 = __importDefault(require("../utilities/security"));
const utilities_1 = __importDefault(require("../utilities/utilities"));
const winston = require('../winston/config');
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const security = new security_1.default();
    const body = req.body;
    body.expDate = moment_timezone_1.default().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    const encript = security.getEncrypt(body);
    res.json({
        error: 0,
        body: body,
        data: encript
    });
});
exports.token = token;
const validarLogin = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const security = new security_1.default();
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let requestLogin;
    let rolesxpersona = new Array();
    let msg = '';
    let arrayRolesxpersona = new Array();
    let rolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    try {
        msg = utilities.validateMessage(headers, body, uuid);
        uuid = uuid + "[METODO->validarLogin]";
        if (msg == "Ok") {
            try {
                requestLogin = utilities.getLoggin(headers, uuid);
                if (requestLogin.idrol == 0) {
                    errorRet = 1;
                    msg = 'Se presentó un error al tratar de obtener la información del login';
                    winston.error(uuid + "[ERROR]->" + msg);
                }
                else {
                    rolesXpersona = yield utilities.validarLigin(headers, uuid);
                }
            }
            catch (error) {
                requestLogin = { idrol: 0, cedula: '0', clave: '0' };
                errorRet = 1;
                msg = 'Se presentó un error al tratar de obtener la información del login ' + error;
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        else {
            errorRet = 1;
            requestLogin = { idrol: 0, cedula: '0', clave: '0' };
            winston.error(uuid + "[ERROR]->" + msg);
        }
    }
    catch (error) {
        requestLogin = { idrol: 0, cedula: '0', clave: '0' };
        errorRet = 1;
        msg = 'Se presentó un error al tratar de obtener la información del login ' + error;
        winston.error(uuid + "[ERROR]->" + msg);
    }
    resp.json({
        error: rolesXpersona.error,
        msg: rolesXpersona.msg,
        rolesxpersona: rolesXpersona.rolesxpersona
    });
});
exports.validarLogin = validarLogin;
//# sourceMappingURL=generic.js.map