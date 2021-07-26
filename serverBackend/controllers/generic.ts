import {Request,Response} from 'express';
import  moment  from 'moment-timezone';
import { PersonaInterface } from '../models/interfaces/persona.interface';
import { RequestLogin } from '../models/interfaces/requestlogin';
import { RolesXpersona, RolXpersona } from '../models/interfaces/rolesxpersona';
import Security from "../utilities/security";
import Utilities from '../utilities/utilities';
const winston = require('../winston/config');

export const token =  async(req:Request, res:Response) => {
    const security = new Security();
    const body = req.body;
    body.expDate = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    const encript = security.getEncrypt(body);
    res.json({
        error:0,
        body:body,
        data:encript
    });
  }

  export const validarLogin =  async (req:Request, resp:Response) => {
    const security = new Security();
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;   
    const headers = req.headers;
    const body = req.body;
    let requestLogin:RequestLogin;
    let rolesxpersona = new Array();
    let msg = '';
    let arrayRolesxpersona:RolXpersona[] = new Array();
    let rolesXpersona:RolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    try{ 
        msg = utilities.validateMessage(headers, body,uuid);
        uuid = uuid + "[METODO->validarLogin]";        
        if(msg == "Ok"){
            try{
                requestLogin = utilities.getLoggin(headers,uuid);
                if(requestLogin.idrol == 0){
                    errorRet = 1;
                    msg = 'Se presentó un error al tratar de obtener la información del login';
                    winston.error(uuid+"[ERROR]->"+msg);
                }else{
                    rolesXpersona  = await utilities.validarLigin(headers,uuid);                    
                }            
            }catch(error){
                requestLogin = {idrol:0,cedula:'0',clave:'0'};   
                errorRet = 1;
                msg = 'Se presentó un error al tratar de obtener la información del login '+error;
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }else{
            errorRet = 1;
            requestLogin = {idrol:0,cedula:'0',clave:'0'};   
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }catch(error){
        requestLogin = {idrol:0,cedula:'0',clave:'0'};   
        errorRet = 1;
        msg = 'Se presentó un error al tratar de obtener la información del login '+error;
        winston.error(uuid+"[ERROR]->"+msg);
    } 
    resp.json({
        error: rolesXpersona.error,
        msg:rolesXpersona.msg,
        rolesxpersona:rolesXpersona.rolesxpersona
    });    
  }