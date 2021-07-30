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
const uuid_1 = require("uuid");
const security_1 = __importDefault(require("./security"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const persona_1 = __importDefault(require("../models/persona"));
const rolesxpersona_1 = __importDefault(require("../models/rolesxpersona"));
const rol_1 = __importDefault(require("../models/rol"));
const winston = require('../winston/config');
const app = express_1.default();
app.use(morgan_1.default('combined', { stream: winston.stream }));
class Utilities {
    constructor() {
    }
    validateMessage(headers, body, uuid) {
        uuid = uuid + "[METODO->validateMessage]";
        const security = new security_1.default();
        const isset = require('isset-php');
        const xorigin = headers['x-origin'];
        const xsessiontoken = headers['x-session-token'];
        winston.info(uuid + "[BODY]" + JSON.stringify(body));
        if (isset(() => xorigin) && isset(() => xsessiontoken)) {
            try {
                const dataEncriptada = xsessiontoken;
                let request = security.getDeEncrypt(dataEncriptada.toString());
                if (JSON.stringify(request) == JSON.stringify(body)) {
                    var now = new Date();
                    let t = Number(process.env.TIMEOUT);
                    var now = new Date();
                    var splitDate = request.expDate.split(" ");
                    var date = splitDate[0].split("-");
                    var time = splitDate[1].split(":");
                    var yyyy = Number(date[0]);
                    var mm = Number(date[1]) - 1;
                    var dd = Number(date[2]);
                    var hh = Number(time[0]);
                    var min = Number(time[1]);
                    var ss = Number(time[2]);
                    var requestDate = new Date(yyyy, mm, dd, hh, min, ss);
                    var diferencia = (Number(now) - Number(requestDate)) / 1000;
                    if (diferencia < t) {
                        return "Ok";
                    }
                    else {
                        return "Token Expirado";
                    }
                }
                else {
                    winston.info(uuid + "[REQUEST]" + JSON.stringify(request));
                    return "El body no es valido";
                }
            }
            catch (error) {
                winston.error(uuid + '[ERROR]->Error en la validacion del token');
                winston.error(uuid + '[ERROR]->' + error);
                return 'Error en la validacion del token';
            }
        }
        else {
            return "No se recibio el token de validación y/o el origen de la aplicación.";
        }
    }
    getLoggin(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->validateLoggin]";
        const security = new security_1.default();
        let requestLogin;
        try {
            let body = security.getDeEncrypt(xsessiontoken.toString());
            let data = body.data;
            requestLogin = data.requestLogin;
        }
        catch (error) {
            requestLogin = { idrol: 0, cedula: '0', clave: '0' };
            winston.error(uuid + '[ERROR]->' + error);
        }
        return requestLogin;
    }
    getPersonadesdeHeader(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getPersonadesdeHeader]";
        const security = new security_1.default();
        let personabase = this.getPersonaInterface();
        try {
            let body = security.getDeEncrypt(xsessiontoken.toString());
            let data = body.data;
            let persona = data.persona;
            personabase.idpersona = persona.idpersona || 0;
            personabase.cedula = persona.cedula || '*',
                personabase.nombre = persona.nombre || '*',
                personabase.direccion = persona.direccion || '*',
                personabase.telefono = persona.telefono || '*',
                personabase.email = persona.email || '*',
                personabase.clave = persona.clave || '*',
                personabase.activo = persona.activo || false;
        }
        catch (error) {
            winston.error(uuid + '[ERROR]->' + error);
        }
        return personabase;
    }
    getEntidadDesdeHeader(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getEntidadDesdeHeader]";
        const security = new security_1.default();
        let entidadbase = this.getEntidadInterface();
        try {
            let body = security.getDeEncrypt(xsessiontoken.toString());
            let data = body.data;
            let entidad = data.entidad;
            entidadbase.identidad = entidad.identidad || 0;
            entidadbase.nit = entidad.nit || '*',
                entidadbase.nombre = entidad.nombre || '*',
                entidadbase.direccion = entidad.direccion || '*',
                entidadbase.telefono = entidad.telefono || '*',
                entidadbase.email = entidad.email || '*',
                entidadbase.activo = entidad.activo || false;
        }
        catch (error) {
            winston.error(uuid + '[ERROR]->' + error);
        }
        return entidadbase;
    }
    getRolesXpersonaDesdeHeader(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getRolesXpersonaDesdeHeader]";
        const security = new security_1.default();
        let rolesXpersonaBase = this.getRolesXpersonaInterface();
        try {
            let body = security.getDeEncrypt(xsessiontoken.toString());
            let data = body.data;
            let rolesxpersona = data.rolxpersona;
            rolesXpersonaBase.idpersona = rolesxpersona.idpersona || 0;
            rolesXpersonaBase.idrol = rolesxpersona.idrol || 0;
            rolesXpersonaBase.idrolesxpersona = rolesxpersona.idrolesxpersona || 0;
        }
        catch (error) {
            winston.error(uuid + '[ERROR]->' + error);
        }
        return rolesXpersonaBase;
    }
    getPersonaInterface() {
        let persona = {
            idpersona: 0,
            cedula: '',
            nombre: '',
            direccion: '',
            telefono: '',
            email: '',
            clave: '',
            activo: false
        };
        return persona;
    }
    getEntidadInterface() {
        let entidad = {
            identidad: 0,
            nombre: '',
            direccion: '',
            telefono: '',
            nit: '',
            email: '',
            createdAt: '',
            updatedAt: '',
            activo: false
        };
        return entidad;
    }
    getRolesXpersonaInterface() {
        let rolesXpersonaInterface = {
            idrolesxpersona: 0,
            idrol: 0,
            idpersona: 0
        };
        return rolesXpersonaInterface;
    }
    getToken() {
        return uuid_1.v4();
    }
    validarLigin(headers, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const security = new security_1.default();
            let arrayRolesxpersona = new Array();
            let requestLogin;
            let errorRet = 0;
            let msgg = '';
            try {
                requestLogin = this.getLoggin(headers, uuid);
                if (requestLogin.idrol == 0) {
                    errorRet = 1;
                    msgg = 'Se presentó un error al tratar de obtener la información del login';
                    winston.error(uuid + "[ERROR]->" + msgg);
                }
                else {
                    try {
                        let persona = yield persona_1.default.findAll({ where: { cedula: requestLogin.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                        if (persona.length > 0) {
                            let personaConPassword = yield persona_1.default.findAll({
                                where: {
                                    cedula: requestLogin.cedula,
                                    clave: security.getDeEncryptString(requestLogin.clave)
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
                                    arrayRolesxpersona = yield rolesxpersona_1.default.findAll({
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
                                    if (arrayRolesxpersona.length > 0) {
                                        arrayRolesxpersona[0].persona.clave = '***...';
                                        if (!arrayRolesxpersona[0].persona.activo) {
                                            errorRet = 1;
                                            msgg = 'Esta persona se encuentra inactiva.';
                                            winston.error(uuid + "[OK]->" + msgg);
                                            arrayRolesxpersona = new Array();
                                        }
                                        else {
                                            errorRet = 0;
                                            msgg = 'Consulta ok';
                                            winston.error(uuid + "[OK]->" + msgg);
                                        }
                                    }
                                    else {
                                        errorRet = 1;
                                        msgg = 'Aunque los datos de la persona fueron encontrados, esta no se encuentra relacionada con el rol seleccionado.';
                                        winston.error(uuid + "[ERROR]->" + msgg);
                                    }
                                }
                                catch (error) {
                                    errorRet = 1;
                                    msgg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n' + error;
                                    winston.error(uuid + "[ERROR]->" + msgg);
                                }
                            }
                            else {
                                errorRet = 1;
                                msgg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su clave.';
                                winston.error(uuid + "[ERROR]->" + msgg);
                            }
                        }
                        else {
                            errorRet = 1;
                            msgg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su cédula.';
                            winston.error(uuid + "[ERROR]->" + msgg);
                        }
                    }
                    catch (error) {
                        errorRet = 1;
                        msgg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
                        winston.error(uuid + "[ERROR]->" + msgg);
                    }
                }
            }
            catch (error) {
                requestLogin = { idrol: 0, cedula: '0', clave: '0' };
                errorRet = 1;
                msgg = 'Se presentó un error al tratar de obtener la información del login ' + error;
                winston.error(uuid + "[ERROR]->" + msgg);
            }
            let rolesXpersona = {
                error: errorRet,
                msg: msgg,
                rolesxpersona: arrayRolesxpersona
            };
            return rolesXpersona;
        });
    }
}
exports.default = Utilities;
//# sourceMappingURL=utilities.js.map