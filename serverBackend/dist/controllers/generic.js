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
const persona_1 = __importDefault(require("../models/persona"));
const rol_1 = __importDefault(require("../models/rol"));
const rolesxpersona_1 = __importDefault(require("../models/rolesxpersona"));
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
/*{
    este requet viajan encriptados
    "data":{
         "idrol": 1,
        "cedula":"88230510",
        "clave":"123456789"
    }
}*/
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
                    try {
                        let persona = yield persona_1.default.findAll({ where: { cedula: requestLogin.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                        if (persona.length > 0) {
                            let personaConPassword = yield persona_1.default.findAll({
                                where: {
                                    cedula: requestLogin.cedula,
                                    clave: JSON.stringify(security.getDeEncrypt(requestLogin.clave))
                                },
                                attributes: [
                                    'idpersona',
                                    'cedula',
                                    'nombre',
                                    'direccion',
                                    'telefono',
                                    'email',
                                    'activo'
                                ],
                                logging: (sql) => winston.info(uuid + "[SQL]" + sql)
                            }).then();
                            if (personaConPassword.length > 0) {
                                let personaEncontrada = personaConPassword[0];
                                try {
                                    rolesxpersona = yield rolesxpersona_1.default.findAll({
                                        where: {
                                            idpersona: personaEncontrada.idpersona,
                                            idrol: requestLogin.idrol
                                        },
                                        include: [
                                            {
                                                model: rol_1.default, as: 'rol', foreignKey: 'idrol'
                                            },
                                            {
                                                model: persona_1.default, as: 'persona', foreignKey: 'idpersona'
                                            }
                                        ],
                                        order: ["idrolesxpersona"], logging: (sql) => winston.info(uuid + "[SQL]" + sql)
                                    }).then();
                                    if (rolesxpersona.length > 0) {
                                        rolesxpersona[0].persona.clave = '***...';
                                        if (!rolesxpersona[0].persona.activo) {
                                            errorRet = 1;
                                            msg = 'Esta persona se encuentra inactiva.';
                                            winston.error(uuid + "[OK]->" + msg);
                                            rolesxpersona = new Array();
                                        }
                                        else {
                                            errorRet = 0;
                                            msg = 'Consulta ok';
                                            winston.error(uuid + "[OK]->" + msg);
                                        }
                                    }
                                    else {
                                        errorRet = 1;
                                        msg = 'Aunque los datos de la persona fueron encontrados, esta no se encuentra relacionada con el rol seleccionado.';
                                        winston.error(uuid + "[ERROR]->" + msg);
                                    }
                                }
                                catch (error) {
                                    errorRet = 1;
                                    msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n' + error;
                                    winston.error(uuid + "[ERROR]->" + msg);
                                }
                            }
                            else {
                                errorRet = 1;
                                msg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su clave.';
                                winston.error(uuid + "[ERROR]->" + msg);
                            }
                        }
                        else {
                            errorRet = 1;
                            msg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su cédula.';
                            winston.error(uuid + "[ERROR]->" + msg);
                        }
                    }
                    catch (error) {
                        errorRet = 1;
                        msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
                        winston.error(uuid + "[ERROR]->" + msg);
                    }
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
        error: errorRet,
        msg,
        rolesxpersona
    });
});
exports.validarLogin = validarLogin;
//# sourceMappingURL=generic.js.map