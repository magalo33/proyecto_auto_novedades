import { Request, Response } from 'express';
import Roles from '../models/rol';
import Utilities from '../utilities/utilities';
const winston = require('../winston/config');

export const getRoles = async ( req: Request,resp: Response )=>{
    const utilities = new Utilities();
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
    }
    resp.json({
        error: errorRet,
        msg: msg,
        roles
    });    
}
