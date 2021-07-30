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
exports.updateRolXpersona = exports.getRolesXpersonas = void 0;
const utilities_1 = __importDefault(require("../utilities/utilities"));
const sequelize_1 = require("sequelize");
const winston = require('../winston/config');
const connection_1 = __importDefault(require("../bd/connection"));
const rolesxpersona_1 = __importDefault(require("../models/rolesxpersona"));
/*
    Retorna la lista de personas con el rol al cual estan asignadas.
    El rtesponse se vé asi:
    {
        error: 0,
        msg: 'consulta exitosa',
        rolesxpersonas:{
            idpersona:0,
            cedula:'88256412',
            nombre:'filanito de tal',
            direccion:'direccion de la casa',
            telefono:'telefono de la casa',
            email:'email@gmail.com',
            clave:'**--',
            activo:true,
            createdAt:'2020/07/07',
            updatedAt:'2020/07/07',
            idrol:1,
            descripcion:'ADMIN',
            idrolesxpersona:105
        }
    }
*/
const getRolesXpersonas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = '';
    let errorRet = 0;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let rolesxpersonas = {};
    msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->getRolesXpersonas]";
    if (msg == "Ok") {
        try {
            rolesxpersonas = yield connection_1.default.query(" select " +
                " per.idpersona, " +
                " per.cedula, " +
                " per.nombre, " +
                " per.direccion, " +
                " per.telefono, " +
                " per.email, " +
                " '**--' as clave, " +
                " per.activo, " +
                " per.\"createdAt\", " +
                " per.\"updatedAt\", " +
                " rol.idrol, " +
                " rol.descripcion, " +
                " autxper.idrolesxpersona " +
                " from autos.rolesxpersona autxper, autos.personas per,autos.roles rol " +
                " where  autxper.idpersona=per.idpersona and autxper.idrol=rol.idrol " +
                " order by per.nombre", { type: sequelize_1.QueryTypes.SELECT });
            msg = 'consulta exitosa';
            winston.info(uuid + "[OK]->" + msg);
        }
        catch (error) {
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n' + error;
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
        rolesxpersonas
    });
});
exports.getRolesXpersonas = getRolesXpersonas;
const updateRolXpersona = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = '';
    let errorRet = 0;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    msg = utilities.validateMessage(req.headers, req.body, uuid);
    uuid = uuid + "[METODO->updateRolXpersona]";
    let arrayRolesxpersona = new Array();
    let rolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    if (msg == "Ok") {
        try {
            let errorRet = 1;
            msg = 'No se realizo la actualización. Verifique el parametro de control';
            rolesXpersona = yield utilities.validarLigin(req.headers, uuid);
            errorRet = rolesXpersona.error;
            msg = rolesXpersona.msg;
            if (errorRet == 0) {
                let rxpRequest = utilities.getRolesXpersonaDesdeHeader(req.headers, uuid);
                console.log('request\n');
                console.log('request\n');
                console.log('request\n');
                console.log(rxpRequest);
                console.log('request\n');
                console.log('request\n');
                console.log('request\n');
                const rpp = yield rolesxpersona_1.default.upsert(rxpRequest, { logging: (sql) => winston.info(uuid + "[SQL]" + sql) }).then(() => {
                    errorRet = 0;
                    msg = 'Edición ok';
                });
            }
            else {
                errorRet = 1;
                winston.error(uuid + "[ERROR]->" + msg);
            }
        }
        catch (error) {
            errorRet = 1;
            winston.error(uuid + "[ERROR]->" + error);
        }
    }
    resp.json({
        error: errorRet,
        msg: msg
    });
});
exports.updateRolXpersona = updateRolXpersona;
/*
    rolesxpersonas = await RolesxPersona.findAll({
    include:[
        {
            model: Roles, as: 'rol',foreignKey:'idrol'
        },
        {
            model: Persona, as: 'persona',foreignKey:'idpersona'
        }
    ],
    order:["Persona.nombre"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
*/ 
//# sourceMappingURL=rolesxpersonas.js.map