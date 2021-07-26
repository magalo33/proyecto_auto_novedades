import { v4 as uuidv4 } from 'uuid';
import Security from './security';
import morgan from 'morgan';
import express from "express";
import { PersonaInterface } from '../models/interfaces/persona.interface';
import { RequestLogin } from '../models/interfaces/requestlogin';
import { EntidadInterface } from '../models/interfaces/entidad.interface';
import Persona from '../models/persona';
import RolesxPersona from '../models/rolesxpersona';
import Roles from '../models/rol';
import { RolesXpersona, RolXpersona } from '../models/interfaces/rolesxpersona';

const winston = require('../winston/config');
const app = express();
app.use(morgan('combined', { stream: winston.stream }));

class Utilities {

    constructor() {
     }
  
     validateMessage(headers:any, body:any,uuid:string){
        uuid = uuid + "[METODO->validateMessage]";
        const security = new Security();
        const isset = require('isset-php');
        const xorigin = headers['x-origin'];
        const xsessiontoken = headers['x-session-token'];
        winston.info(uuid+"[BODY]"+JSON.stringify(body));
        if (isset(() => xorigin) && isset(() => xsessiontoken)) {            
            try {                                
                const dataEncriptada = xsessiontoken;
                let request = security.getDeEncrypt(dataEncriptada.toString());
                if(JSON.stringify(request) == JSON.stringify(body)){
                    var now = new Date();
                    let t:Number = Number(process.env.TIMEOUT);
                    var now = new Date();
                    var splitDate= request.expDate.split(" ");
                    var date=splitDate[0].split("-");
                    var time=splitDate[1].split(":");
                    var yyyy =Number(date[0]);
                    var mm=Number(date[1])-1;
                    var dd=Number(date[2]);
                    var hh=Number(time[0]);
                    var min=Number(time[1]);
                    var ss=Number(time[2]);
                    var requestDate = new Date(yyyy,mm,dd,hh,min,ss);
                    var diferencia = (Number(now) - Number(requestDate))/1000;
                    if(diferencia<t){
                        return "Ok";
                    }else{
                        return "Token Expirado";
                    }
                }else{                    
                    winston.info(uuid+"[REQUEST]"+JSON.stringify(request));
                    return "El body no es valido";
                }
            } catch (error) {
                winston.error(uuid+'[ERROR]->Error en la validacion del token');
                winston.error(uuid+'[ERROR]->'+error);
                return 'Error en la validacion del token';
            }                        
        }else{
            return "No se recibio el token de validación y/o el origen de la aplicación.";
        }
    }

    getLoggin(headers:any,uuid:string):RequestLogin{
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->validateLoggin]";
        const security = new Security();
        let requestLogin:RequestLogin;
        try{
            let body = security.getDeEncrypt(xsessiontoken.toString());
            let data = body.data;
            requestLogin = data.requestLogin;      
        }catch(error){
            requestLogin = {idrol:0,cedula:'0',clave:'0'};   
            winston.error(uuid+'[ERROR]->'+error);
        }
        return requestLogin;
    }    

    getPersonadesdeBody(headers:any,uuid:string):PersonaInterface{
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getPersonadesdeBody]";
        const security = new Security();
        let personabase:PersonaInterface = this.getPersonaInterface();
        try{
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
        }catch(error){
            winston.error(uuid+'[ERROR]->'+error);
        }
        return personabase;
    }

    getEntidadDesdeBody(headers:any,uuid:string):EntidadInterface{
        const xsessiontoken = headers['x-session-token'];
        uuid = uuid + "[METODO->getEntidaddeBody]";
        const security = new Security();
        let entidadbase:EntidadInterface = this.getEntidadInterface();
        try{
           let body = security.getDeEncrypt(xsessiontoken.toString());
           let data = body.data;
           let entidad = <EntidadInterface>data.entidad;
           entidadbase.identidad = entidad.identidad || 0;
           entidadbase.nit = entidad.nit || '*',
           entidadbase.nombre = entidad.nombre || '*',
           entidadbase.direccion = entidad.direccion || '*',
           entidadbase.telefono = entidad.telefono || '*',
           entidadbase.email = entidad.email || '*',
           entidadbase.activo = entidad.activo || false;
        }catch(error){
            winston.error(uuid+'[ERROR]->'+error);
        }
        return entidadbase;
    }

    getPersonaInterface():PersonaInterface{
        let persona:PersonaInterface= {    
            idpersona:0,
            cedula:'',
            nombre:'',
            direccion:'',
            telefono:'',
            email:'',
            clave:'',
            activo: false};
            return persona;
    }


    getEntidadInterface():EntidadInterface{
        let entidad:EntidadInterface= {    
            identidad:0,
            nombre:'',
            direccion:'',
            telefono:'',
            nit:'',
            email:'',
            createdAt:'',
            updatedAt:'',
            activo: false
        };
        return entidad;
    }



    public getToken(): string {
        return uuidv4();
      }


      async validarLigin(headers:any,uuid:string):Promise<RolesXpersona>{
        const security = new Security();
        let arrayRolesxpersona:RolXpersona[] = new Array();
        let requestLogin:RequestLogin;
        let errorRet = 0;
        let msgg = '';
        try{
            requestLogin = this.getLoggin(headers,uuid);
            if(requestLogin.idrol == 0){
                errorRet = 1;
                msgg = 'Se presentó un error al tratar de obtener la información del login';
                winston.error(uuid+"[ERROR]->"+msgg);
            }else{
                try{
                    let persona = await Persona.findAll( {where:{cedula:requestLogin.cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                    if(persona.length>0){
                        let personaConPassword = await Persona.findAll( {
                            where:
                            { 
                                cedula:requestLogin.cedula,
                                clave: security.getDeEncryptString(requestLogin.clave)
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
                                arrayRolesxpersona = await RolesxPersona.findAll({
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
                                if(arrayRolesxpersona.length>0){
                                    arrayRolesxpersona[0].persona.clave = '***...';
                                    if(!arrayRolesxpersona[0].persona.activo){
                                        errorRet = 1;
                                        msgg = 'Esta persona se encuentra inactiva.';
                                        winston.error(uuid+"[OK]->"+msgg);
                                        arrayRolesxpersona = new Array();
                                    }else{
                                        errorRet = 0;
                                        msgg = 'Consulta ok';
                                        winston.error(uuid+"[OK]->"+msgg);
                                    }                                    
                                }else{
                                    errorRet = 1;
                                    msgg = 'Aunque los datos de la persona fueron encontrados, esta no se encuentra relacionada con el rol seleccionado.';
                                    winston.error(uuid+"[ERROR]->"+msgg);
                                }                                
                            }catch(error){
                                errorRet = 1;
                                msgg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n'+error;
                                winston.error(uuid+"[ERROR]->"+msgg);
                            }
                        }else{
                            errorRet = 1;
                            msgg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su clave.';
                            winston.error(uuid+"[ERROR]->"+msgg);
                        }
                    }else{
                        errorRet = 1;
                        msgg = 'No se encontraron datos con ese criterio de busqueda. Debe verificar su cédula.';
                        winston.error(uuid+"[ERROR]->"+msgg);
                    }
                }catch(error){
                    errorRet = 1;
                    msgg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
                    winston.error(uuid+"[ERROR]->"+msgg);
                }
            }            
        }catch(error){
            requestLogin = {idrol:0,cedula:'0',clave:'0'};   
            errorRet = 1;
            msgg = 'Se presentó un error al tratar de obtener la información del login '+error;
            winston.error(uuid+"[ERROR]->"+msgg);
        }
        let rolesXpersona:RolesXpersona={
            error: errorRet,
            msg: msgg,
            rolesxpersona: arrayRolesxpersona
        };
        return rolesXpersona;
      }
      
  }
  
  
  export default Utilities;