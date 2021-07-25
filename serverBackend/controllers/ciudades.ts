import { Request, Response } from 'express';
import Ciudad from '../models/ciudad';
import Utilities from '../utilities/utilities';
const winston = require('../winston/config');

export const getCiudades = async ( req: Request,resp: Response )=>{
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;   
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getCiudades]";
    let ciudades = {};
    if(msg == "Ok"){
        try{
            ciudades = await Ciudad.findAll({order:["idciudad"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
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
        ciudades
    });    
}




export const getCiudad = async ( req: Request,resp: Response )=>{
    const { id } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;   
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getCiudad]";
    let ciudad = {};
    if(msg == "Ok"){
        try{
            ciudad = await Ciudad.findByPk(id,{logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
            if(ciudad){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                errorRet = 1;
                msg = 'No se encontro ciudad relacionada al parametro de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);    
                ciudad = {};            
            }
            
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
        ciudad
    });    
}


export const getCiudadPorDepartamento = async ( req: Request,resp: Response )=>{
    const { id } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;   
    const headers = req.headers;
    const body = req.body;
    let msg = utilities.validateMessage(headers, body,uuid);
    uuid = uuid + "[METODO->getCiudadPorDepartamento]";
    let ciudades = {};
    if(msg == "Ok"){
        try{
            ciudades = await Ciudad.findAll({where:{iddepartamento:id},order:["descripcion"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
            if(ciudades){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                errorRet = 1;
                msg = 'No se encontro ciudad relacionada al parametro de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);    
                ciudades = {};            
            }
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
        ciudades
    });    
}