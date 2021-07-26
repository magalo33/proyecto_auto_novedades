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
exports.actualizarEntidad = exports.getEntidadPorEmail = exports.getEntidadPorTelefono = exports.getEntidadPorNombre = exports.getEntidadPorNit = exports.getEntidad = exports.getEntidades = void 0;
const utilities_1 = __importDefault(require("../utilities/utilities"));
const sequelize_1 = __importDefault(require("sequelize"));
//import { PersonaInterface } from '../models/interfaces/persona.interface';
const entidad_1 = __importDefault(require("../models/entidad"));
const winston = require('../winston/config');
/*
    Retorna un listado de todas las entidades en la base de datos
*/
const getEntidades = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidades]";
    let entidades = {};
    if (msg == "Ok") {
        try {
            entidades = yield entidad_1.default.findAll({ order: ["nombre"], logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
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
        entidades
    });
});
exports.getEntidades = getEntidades;
/*
    Retorna una entidad por su id
*/
const getEntidad = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidad]";
    let entidad = {};
    if (msg == "Ok") {
        try {
            entidad = yield entidad_1.default.findByPk(id, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (entidad) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                entidad = {};
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
        entidad
    });
});
exports.getEntidad = getEntidad;
/*
    Retorna una entidad por su nit
*/
const getEntidadPorNit = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { nit } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidadPorNit]";
    let entidad = new Array();
    if (msg == "Ok") {
        try {
            entidad = yield entidad_1.default.findAll({ order: ["nombre"], where: { nit: nit }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (entidad.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                entidad = new Array();
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
        entidad
    });
});
exports.getEntidadPorNit = getEntidadPorNit;
/*
    Retorna una entidad por su nombre
*/
const getEntidadPorNombre = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidadPorNombre]";
    let entidad = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            entidad = yield entidad_1.default.findAll({ order: ["nombre"], where: { nombre: { [Op.iLike]: '%' + nombre + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (entidad.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                entidad = new Array();
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
        entidad
    });
});
exports.getEntidadPorNombre = getEntidadPorNombre;
/*
    Retorna una entidad por su telefono
*/
const getEntidadPorTelefono = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { telefono } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidadPorTelefono]";
    let entidad = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            entidad = yield entidad_1.default.findAll({ order: ["nombre"], where: { telefono: { [Op.iLike]: '%' + telefono + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (entidad.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                entidad = new Array();
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
        entidad
    });
});
exports.getEntidadPorTelefono = getEntidadPorTelefono;
/*
    Retorna una persona por su email
*/
const getEntidadPorEmail = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getEntidadPorEmail]";
    let entidad = new Array();
    const Op = sequelize_1.default.Op;
    if (msg == "Ok") {
        try {
            entidad = yield entidad_1.default.findAll({ order: ["nombre"], where: { email: { [Op.iLike]: '%' + email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
            if (entidad.length > 0) {
                winston.info(uuid + "[OK]->consulta exitosa");
            }
            else {
                entidad = new Array();
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
        entidad
    });
});
exports.getEntidadPorEmail = getEntidadPorEmail;
/*

    actualiza o registra una nueva entidad dependiendo del path de control
    ip:puerto/api/v1/entidades/actualizar/:path
    posibles path de control:
        estado:     actualiza el campo activo ya sea para true o false
        nombre:     actauliza el campo nombre
        direccion:  actauliza el campo direccion
        telefono:   actauliza el campo telefono
        email:      actauliza el campo email
        nit:        actauliza el campo nit
        todo:       actauliza todo el registro o lo crea en el caso en que el id no exista
        nuevo:      crea un nuevo registro

    elemplo del request

        "data": {
            "entidad": {
                "identidad": 6,
                "nit": "88230515",
                "nombre": "elquin... usuario",
                "direccion": "direccion del sexto usuario",
                "telefono": "3222282572",
                "email": "elmail@delsexto.com",
                "activo": false
            }
        }

*/
const actualizarEntidad = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { item } = req.params; /*Path de control*/
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->actualizarEntidad]";
    let entidad = utilities.getEntidadInterface();
    let actualizado = false;
    let arrayRolesxpersona = new Array();
    let rolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    if (msg == "Ok") {
        msg = 'No se realizo la actualización. Verifique el parametro de control';
        rolesXpersona = yield utilities.validarLigin(req.headers, uuid);
        errorRet = rolesXpersona.error;
        msg = rolesXpersona.msg;
        if (errorRet == 0) {
            try {
                entidad = utilities.getEntidadDesdeBody(req.headers, uuid);
                if (entidad.identidad > 0) {
                    if (item == 'estado') {
                        entidad = (yield entidad_1.default.update({ activo: entidad.activo }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                        actualizado = true;
                    }
                    else {
                        if (item == 'nombre') {
                            entidad = (yield entidad_1.default.update({ nombre: entidad.nombre }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                            actualizado = true;
                        }
                        else {
                            if (item == 'direccion') {
                                entidad = (yield entidad_1.default.update({ direccion: entidad.direccion }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                actualizado = true;
                            }
                            else {
                                if (item == 'telefono') {
                                    entidad = (yield entidad_1.default.update({ telefono: entidad.telefono }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                    actualizado = true;
                                }
                                else {
                                    if (item == 'email') {
                                        const Op = sequelize_1.default.Op;
                                        let consultaPorEmail = yield entidad_1.default.findAll({ where: { email: { [Op.iLike]: '%' + entidad.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                        if (consultaPorEmail.length > 0) {
                                            errorRet = 1;
                                            msg = 'Ya existe una entidad con este email';
                                            winston.error(uuid + "[ERROR]->" + msg);
                                        }
                                        else {
                                            entidad = (yield entidad_1.default.update({ email: entidad.email }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                            actualizado = true;
                                        }
                                    }
                                    else {
                                        if (item == 'nit') {
                                            let consultaPorCedula = yield entidad_1.default.findAll({ where: { nit: entidad.nit }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                            if (consultaPorCedula.length > 0) {
                                                errorRet = 1;
                                                msg = 'Ya existe una entidad con este nit';
                                                winston.error(uuid + "[ERROR]->" + msg);
                                            }
                                            else {
                                                entidad = (yield entidad_1.default.update({ nit: entidad.nit }, { where: { identidad: entidad.identidad }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                                actualizado = true;
                                            }
                                        }
                                        else {
                                            if (item == 'todo') {
                                                const Op = sequelize_1.default.Op;
                                                let consultaPorEmail = yield entidad_1.default.findAll({ where: { email: { [Op.iLike]: '%' + entidad.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                if (consultaPorEmail.length > 0) {
                                                    errorRet = 1;
                                                    msg = 'Ya existe una entidad con este email';
                                                    winston.error(uuid + "[ERROR]->" + msg);
                                                }
                                                else {
                                                    let consultaPorNit = yield entidad_1.default.findAll({ where: { nit: entidad.nit }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                    if (consultaPorNit.length > 0) {
                                                        errorRet = 1;
                                                        msg = 'Ya existe una entidad con este nit';
                                                        winston.error(uuid + "[ERROR]->" + msg);
                                                    }
                                                    else {
                                                        entidad = (yield entidad_1.default.upsert(entidad, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                                        actualizado = true;
                                                    }
                                                }
                                            }
                                            else {
                                                if (item == 'nuevo') {
                                                    const Op = sequelize_1.default.Op;
                                                    let consultaPorEmail = yield entidad_1.default.findAll({ where: { email: { [Op.iLike]: '%' + entidad.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                    if (consultaPorEmail.length > 0) {
                                                        errorRet = 1;
                                                        msg = 'Ya existe una entidad con este email';
                                                        winston.error(uuid + "[ERROR]->" + msg);
                                                    }
                                                    else {
                                                        let consultaPorNit = yield entidad_1.default.findAll({ where: { nit: entidad.nit }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                                                        if (consultaPorNit.length > 0) {
                                                            errorRet = 1;
                                                            msg = 'Ya existe una entidad con este nit';
                                                            winston.error(uuid + "[ERROR]->" + msg);
                                                        }
                                                        else {
                                                            entidad = (yield entidad_1.default.create({
                                                                nit: entidad.nit,
                                                                nombre: entidad.nombre,
                                                                direccion: entidad.direccion,
                                                                telefono: entidad.telefono,
                                                                email: entidad.email,
                                                                activo: false
                                                            }, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                                            msg = 'Registro de nueva entidad ok';
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
                        let consultaPorEmail = yield entidad_1.default.findAll({ where: { email: { [Op.iLike]: '%' + entidad.email + '%' } }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                        if (consultaPorEmail.length > 0) {
                            errorRet = 1;
                            msg = 'Ya existe una entidad con este email';
                            winston.error(uuid + "[ERROR]->" + msg);
                        }
                        else {
                            let consultaPorNit = yield entidad_1.default.findAll({ where: { nit: entidad.nit }, logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then();
                            if (consultaPorNit.length > 0) {
                                errorRet = 1;
                                msg = 'Ya existe una entidad con este nit';
                                winston.error(uuid + "[ERROR]->" + msg);
                            }
                            else {
                                entidad = (yield entidad_1.default.create({
                                    nit: entidad.nit,
                                    nombre: entidad.nombre,
                                    direccion: entidad.direccion,
                                    telefono: entidad.telefono,
                                    email: entidad.email,
                                    activo: false
                                }, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then());
                                msg = 'Registro de nueva entidad ok';
                                actualizado = true;
                            }
                        }
                    }
                    else {
                        errorRet = 1;
                        msg = 'Se presentó un arror al tratar de obtener el objeto entidad';
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
exports.actualizarEntidad = actualizarEntidad;
//# sourceMappingURL=entidades.js.map