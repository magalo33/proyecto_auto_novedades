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
exports.actualizarPersona = exports.getPersonaPorEmail = exports.getPersonaPorTelefono = exports.getPersonaPorNombre = exports.getPersonaPorCedula = exports.getPersona = exports.getPersonas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const utilities_1 = __importDefault(require("../utilities/utilities"));
const sequelize_1 = __importDefault(require("sequelize"));
const winston = require('../winston/config');
/*
    Retorna un listado de todas las personas en la base de datos
*/
const getPersonas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersonas]";
    let personas = {};
    if (msg == "Ok") {
        try {
            personas = yield persona_1.default.findAll({ order: ["nombre"], logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            winston.info(uuid + "[OK]->consulta exitosa");
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        personas
    });
});
exports.getPersonas = getPersonas;
/*
    Retorna una persona por su id
*/
const getPersona = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersona]";
    let persona = {};
    if (msg == "Ok") {
        try {
            persona = yield persona_1.default.findByPk(id, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (persona) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                persona = {};
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        persona
    });
});
exports.getPersona = getPersona;
/*
    Retorna una persona por su cedula
*/
const getPersonaPorCedula = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { cedula } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersonaPorCedula]";
    let persona = new Array();
    if (msg == "Ok") {
        try {
            persona = yield persona_1.default.findAll({ where: { cedula: cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (persona.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        persona
    });
});
exports.getPersonaPorCedula = getPersonaPorCedula;
/*
    Retorna una persona por su nombre
*/
const getPersonaPorNombre = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersonaPorNombre]";
    let persona = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            persona = yield persona_1.default.findAll({ where: { nombre: { [Op.iLike]: '%' + nombre + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (persona.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        persona
    });
});
exports.getPersonaPorNombre = getPersonaPorNombre;
/*
    Retorna una persona por su telefono
*/
const getPersonaPorTelefono = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { telefono } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersonaPorEmail]";
    let persona = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            persona = yield persona_1.default.findAll({ where: { telefono: { [Op.iLike]: '%' + telefono + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (persona.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        persona
    });
});
exports.getPersonaPorTelefono = getPersonaPorTelefono;
/*
    Retorna una persona por su email
*/
const getPersonaPorEmail = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getPersonaPorEmail]";
    let persona = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            persona = yield persona_1.default.findAll({ where: { email: { [Op.iLike]: '%' + email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (persona.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
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
        persona
    });
});
exports.getPersonaPorEmail = getPersonaPorEmail;
/*
    actualiza o registra un nuevo usuario dependiendo del path de control
    ip:puerto/api/v1/personas/actualizar/:path
    posibles path de control:
        estado:     actualiza el campo activo ya sea para true o false
        nombre:     actauliza el campo nombre
        direccion:  actauliza el campo direccion
        telefono:   actauliza el campo telefono
        email:      actauliza el campo email
        cedula:     actauliza el campo cedula
        clave:      actauliza el campo clave
        todo:       actauliza todo el registro o lo crea en el caso en que el id no exista
        nuevo:      crea un nuevo registro

    elemplo del request

        "data": {
            "persona": {
                "idpersona": 6,
                "cedula": "88230515",
                "nombre": "elquin... usuario",
                "direccion": "direccion del sexto usuario",
                "telefono": "3222282572",
                "email": "elmail@delsexto.com",
                "clave": "clavedelsexto",
                "activo": false
            }
        }

*/
const actualizarPersona = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { item } = req.params; /*Path de control*/
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->actualizarEstadoPersona]";
    let persona = utilities.getPersonaInterface();
    let actualizado = false;
    if (msg == "Ok") {
        msg = 'No se realizo la actualización. Verifique el parametro de control';
        try {
            persona = utilities.getPersonadesdeBody(req.headers, uuid);
            if (persona.idpersona > 0) {
                if (item == 'estado') {
                    persona = (yield persona_1.default.update({ activo: persona.activo }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                    actualizado = true;
                }
                else {
                    if (item == 'nombre') {
                        persona = (yield persona_1.default.update({ nombre: persona.nombre }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                        actualizado = true;
                    }
                    else {
                        if (item == 'direccion') {
                            persona = (yield persona_1.default.update({ direccion: persona.direccion }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                            actualizado = true;
                        }
                        else {
                            if (item == 'telefono') {
                                persona = (yield persona_1.default.update({ telefono: persona.telefono }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                actualizado = true;
                            }
                            else {
                                if (item == 'email') {
                                    const Op = sequelize_1.default.Op;
                                    let consultaPorEmail = yield persona_1.default.findAll({ where: { email: { [Op.iLike]: '%' + persona.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                    if (consultaPorEmail.length > 0) {
                                        errorRet = 1;
                                        msg = 'Ya existe una persona con este email';
                                        winston.error(uuid + "[ERROR]->" + msg);
                                    }
                                    else {
                                        persona = (yield persona_1.default.update({ email: persona.email }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                        actualizado = true;
                                    }
                                }
                                else {
                                    if (item == 'cedula') {
                                        let consultaPorCedula = yield persona_1.default.findAll({ where: { cedula: persona.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                        if (consultaPorCedula.length > 0) {
                                            errorRet = 1;
                                            msg = 'Ya existe una persona con esta cédula';
                                            winston.error(uuid + "[ERROR]->" + msg);
                                        }
                                        else {
                                            persona = (yield persona_1.default.update({ cedula: persona.cedula }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                            actualizado = true;
                                        }
                                    }
                                    else {
                                        if (item == 'clave') {
                                            persona = (yield persona_1.default.update({ clave: persona.clave }, { where: { idpersona: persona.idpersona }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                            actualizado = true;
                                        }
                                        else {
                                            if (item == 'todo') {
                                                const Op = sequelize_1.default.Op;
                                                let consultaPorEmail = yield persona_1.default.findAll({ where: { email: { [Op.iLike]: '%' + persona.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                if (consultaPorEmail.length > 0) {
                                                    errorRet = 1;
                                                    msg = 'Ya existe una persona con este email';
                                                    winston.error(uuid + "[ERROR]->" + msg);
                                                }
                                                else {
                                                    let consultaPorCedula = yield persona_1.default.findAll({ where: { cedula: persona.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                    if (consultaPorCedula.length > 0) {
                                                        errorRet = 1;
                                                        msg = 'Ya existe una persona con esta cédula';
                                                        winston.error(uuid + "[ERROR]->" + msg);
                                                    }
                                                    else {
                                                        persona = (yield persona_1.default.upsert(persona, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                                        actualizado = true;
                                                    }
                                                }
                                            }
                                            else {
                                                if (item == 'nuevo') {
                                                    const Op = sequelize_1.default.Op;
                                                    let consultaPorEmail = yield persona_1.default.findAll({ where: { email: { [Op.iLike]: '%' + persona.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                    if (consultaPorEmail.length > 0) {
                                                        errorRet = 1;
                                                        msg = 'Ya existe una persona con este email';
                                                        winston.error(uuid + "[ERROR]->" + msg);
                                                    }
                                                    else {
                                                        let consultaPorCedula = yield persona_1.default.findAll({ where: { cedula: persona.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                        if (consultaPorCedula.length > 0) {
                                                            errorRet = 1;
                                                            msg = 'Ya existe una persona con esta cédula';
                                                            winston.error(uuid + "[ERROR]->" + msg);
                                                        }
                                                        else {
                                                            persona = (yield persona_1.default.create({
                                                                cedula: persona.cedula,
                                                                nombre: persona.nombre,
                                                                direccion: persona.direccion,
                                                                telefono: persona.telefono,
                                                                email: persona.email,
                                                                clave: persona.clave,
                                                                activo: false
                                                            }, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                                            msg = 'Registro de nueva persona ok';
                                                            actualizado = true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (actualizado) {
                    msg = "actualizacion exitosa";
                    winston.info(uuid + "[OK]->" + msg);
                }
                else {
                    errorRet = 1;
                    winston.error(uuid + "[ERROR]->" + msg);
                }
            }
            else {
                if (item == 'nuevo') {
                    const Op = sequelize_1.default.Op;
                    let consultaPorEmail = yield persona_1.default.findAll({ where: { email: { [Op.iLike]: '%' + persona.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                    if (consultaPorEmail.length > 0) {
                        errorRet = 1;
                        msg = 'Ya existe una persona con este email';
                        winston.error(uuid + "[ERROR]->" + msg);
                    }
                    else {
                        let consultaPorCedula = yield persona_1.default.findAll({ where: { cedula: persona.cedula }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                        if (consultaPorCedula.length > 0) {
                            errorRet = 1;
                            msg = 'Ya existe una persona con esta cédula';
                            winston.error(uuid + "[ERROR]->" + msg);
                        }
                        else {
                            persona = (yield persona_1.default.create({
                                cedula: persona.cedula,
                                nombre: persona.nombre,
                                direccion: persona.direccion,
                                telefono: persona.telefono,
                                email: persona.email,
                                clave: persona.clave,
                                activo: false
                            }, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                            msg = 'Registro de nueva persona ok';
                            actualizado = true;
                        }
                    }
                }
                else {
                    errorRet = 1;
                    msg = 'Se presentó un arror al tratar de obtener el objeto persona';
                    winston.error(uuid + "[ERROR]->" + msg);
                }
            }
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos ' + error;
            winston.error(uuid + "[ERROR]->" + msg);
        }
    }
    else {
        errorRet = 1;
        winston.error(uuid + "[ERROR]->" + msg);
    }
    resp.json({
        error: errorRet,
        msg: msg
    });
});
exports.actualizarPersona = actualizarPersona;
//# sourceMappingURL=personas.js.map