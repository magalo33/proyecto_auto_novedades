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
exports.getContactos = void 0;
const contacto_1 = __importDefault(require("../models/contacto"));
const entidad_1 = __importDefault(require("../models/entidad"));
const persona_1 = __importDefault(require("../models/persona"));
const utilities_1 = __importDefault(require("../utilities/utilities"));
const winston = require('../winston/config');
const getContactos = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = '';
    let errorRet = 0;
    const utilities = new utilities_1.default();
    let uuid = utilities.getToken();
    let contactos = {};
    try {
        contactos = yield contacto_1.default.findAll({
            include: [
                {
                    model: entidad_1.default, as: 'Entidad', foreignKey: 'identidad'
                },
                {
                    model: persona_1.default, as: 'Persona', foreignKey: 'idpersona'
                }
            ],
            order: ["cargo"], logging: (sql) => winston.info(uuid + "[SQL]" + sql)
        }).then();
        winston.info(uuid + "[OK]->consulta exitosa");
    }
    catch (error) {
        errorRet = 1;
        msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n' + error;
        winston.error(uuid + "[ERROR]->" + msg);
    }
    /*const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getRoles]";
    let roles = {};
    if(msg == "Ok"){
        try{
            roles = await Roles.findAll({order:["descripcion"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
            winston.info(uuid+"[OK]->consulta exitosa");
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos';
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }*/
    resp.json({
        error: errorRet,
        msg: msg,
        contactos
    });
});
exports.getContactos = getContactos;
//# sourceMappingURL=contactos.js.map