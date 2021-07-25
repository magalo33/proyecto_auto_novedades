import { Request, Response } from 'express';
import Departamento from '../models/departamento';
import Utilities from '../utilities/utilities';
const winston = require('../winston/config');

export const getDepartamentos = async ( req: Request,resp: Response )=>{
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getDepartamentos]";
    let departamentos = {};
    if(msg == "Ok"){
        try{
            departamentos = await Departamento.findAll({order:["iddepartamento"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
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
        departamentos
    });    
}

export const getDepartamento = async ( req: Request,resp: Response )=>{
    const { id } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getDepartamento]";
    let departamentos = {};
    if(msg == "Ok"){
        try{
            departamentos = await Departamento.findByPk( id,{logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
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
        departamentos
    });
}
