"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const security_1 = __importDefault(require("./security"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
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
    getPersonadesdeBody(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getPersonadesdeBody]";
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
    getEntidadDesdeBody(headers, uuid) {
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getEntidaddeBody]";
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
    getToken() {
        return uuid_1.v4();
    }
}
exports.default = Utilities;
//# sourceMappingURL=utilities.js.map