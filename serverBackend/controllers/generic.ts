import {Request,Response} from 'express';
import  moment  from 'moment-timezone';
import { PersonaInterface } from '../models/interfaces/persona.interface';
import { RequestLogin } from '../models/interfaces/requestlogin';
import Persona from '../models/persona';
import Roles from '../models/rol';
import RolesxPersona from '../models/rolesxpersona';
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

  /*{
      este requet viajan encriptados
      "data":{
           "idrol": 1,
          "cedula":"88230510",
          "clave":"123456789"
      }
  }*/
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
                    try{
                        let persona = await Persona.findAll( {where:{cedula:requestLogin.cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                        if(persona.length>0){
                            let personaConPassword = await Persona.findAll( {
                                where:
                                { 
                                    cedula:requestLogin.cedula,
                                    clave: JSON.stringify(security.getDeEncrypt(requestLogin.clave))
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
                                logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                            if(personaConPassword.length>0){                            
                                let personaEncontrada:any = personaConPassword[0];
                                try{
                                    rolesxpersona = await RolesxPersona.findAll({
                                        where:
                                        {
                                            idpersona:personaEncontrada.idpersona,
                                            idrol:requestLogin.idrol
                                        },
                                        include:[
                                            {
                                                model: Roles, as: 'rol',foreignKey:'idrol'
                                            },
                                            {
                                                model: Persona, as: 'persona',foreignKey:'idpersona'
                                            }
                                        ],
                                    order:["idrolesxpersona"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
                                    if(rolesxpersona.length>0){
                                        rolesxpersona[0].persona.clave = '***...';
                                        if(!rolesxpersona[0].persona.activo){
                                            errorRet = 1;
                                            msg = 'Esta persona se encuentra inactiva.';
                                            winston.error(uuid+"[OK]->"+msg);
                                            rolesxpersona = new Array();
                                        }else{
                                            errorRet = 0;
                                            msg = 'Consulta ok';
                                            winston.error(uuid+"[OK]->"+msg);
                                        }                                    
                                    }else{
                                        errorRet = 1;
                                        msg = 'Aunque los datos de la persona fueron encontrados, esta no se encuentra relacionada con el rol seleccionado.';
                                        winston.error(uuid+"[ERROR]->"+msg);
                                    }                                
                                }catch(error){
                                    errorRet = 1;
                                    msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n'+error;
                                    winston.error(uuid+"[ERROR]->"+msg);
                                }
                            }else{
                                errorRet = 1;
                                msg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su clave.';
                                winston.error(uuid+"[ERROR]->"+msg);
                            }
                        }else{
                            errorRet = 1;
                            msg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su cédula.';
                            winston.error(uuid+"[ERROR]->"+msg);
                        }
                    }catch(error){
                        errorRet = 1;
                        msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
                        winston.error(uuid+"[ERROR]->"+msg);
                    }
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
        error: errorRet,
        msg,
        rolesxpersona
    });    
  }