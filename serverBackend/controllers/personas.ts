import { Request, Response } from 'express';
import Persona from '../models/persona';
import Utilities from '../utilities/utilities';
import Sequelize from 'sequelize';
import { PersonaInterface } from '../models/interfaces/persona.interface';
import { RolesXpersona, RolXpersona } from '../models/interfaces/rolesxpersona';
const winston = require('../winston/config');
import db from '../bd/connection';
import  { QueryTypes } from 'sequelize';

/*
    Retorna un listado de todas las personas en la base de datos
*/
export const getPersonas = async ( req: Request,resp: Response )=>{
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersonas]";
    let personas = {};
    if(msg == "Ok"){
        try{
            personas = await Persona.findAll({order:["nombre"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
            winston.info(uuid+"[OK]->consulta exitosa");
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        personas
    });    
}

/*
    Retorna una persona por su id
*/
export const getPersona = async ( req: Request,resp: Response )=>{
    const { id } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersona]";
    let persona = {};
    if(msg == "Ok"){
        try{
            persona = await Persona.findByPk( id,{logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(persona){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                persona = {};
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        persona
    });
}


/*
    Retorna una persona por su cedula
*/
export const getPersonaPorCedula = async ( req: Request,resp: Response )=>{
    const { cedula } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersonaPorCedula]";
    let persona = new Array();
    if(msg == "Ok"){
        try{
            persona = await Persona.findAll( {where:{cedula:cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(persona.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        persona
    });
}

/*
    Retorna una persona por su nombre
*/
export const getPersonaPorNombre = async ( req: Request,resp: Response )=>{
    const { nombre } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersonaPorNombre]";
    let persona = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            persona = await Persona.findAll( {where:{nombre: {[Op.iLike]: '%'+nombre+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(persona.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        persona
    });
}

/*
    Retorna una persona por su telefono
*/
export const getPersonaPorTelefono = async ( req: Request,resp: Response )=>{
    const { telefono } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersonaPorEmail]";
    let persona = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            persona = await Persona.findAll( {where:{telefono: {[Op.iLike]: '%'+telefono+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(persona.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        persona
    });
}

/*
    Retorna una persona por su email
*/
export const getPersonaPorEmail = async ( req: Request,resp: Response )=>{
    const { email } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getPersonaPorEmail]";
    let persona = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            persona = await Persona.findAll( {where:{email: {[Op.iLike]: '%'+email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(persona.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                persona = new Array();
                errorRet = 1;
                msg = 'No se encontraron datos con ese criterio de busqueda';
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        persona
    });
}


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
        Tener en cuenta que al registrar un usuario, la base de datos, por medio de trigger asigna el rol usuario a esta persona
*/
export const actualizarPersona = async ( req: Request,resp: Response )=>{
    const { item } = req.params;/*Path de control*/
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;     
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->actualizarEstadoPersona]";
    let persona:PersonaInterface = utilities.getPersonaInterface();
    let actualizado:boolean = false;
    let arrayRolesxpersona:RolXpersona[] = new Array();
    let rolesXpersona:RolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    if(msg == "Ok"){
        msg = 'No se realizo la actualización. Verifique el parametro de control';
        rolesXpersona  = await utilities.validarLigin(req.headers,uuid);       
        errorRet = rolesXpersona.error;
        msg = rolesXpersona.msg;
        if(errorRet == 0){
            try{            
                persona = utilities.getPersonadesdeHeader(req.headers,uuid);
                if(persona.idpersona>0){
                    if(item=='estado'){
                        persona = <PersonaInterface>await Persona.update( {activo:persona.activo} ,
                             {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                             actualizado = true;
                    }else{
                        if(item=='nombre'){
                            persona = <PersonaInterface>await Persona.update( {nombre:persona.nombre} ,
                                 {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                 actualizado = true;
                        }else{
                            if(item=='direccion'){
                                persona = <PersonaInterface>await Persona.update( {direccion:persona.direccion} ,
                                     {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                     actualizado = true;
                            }else{
                                if(item=='telefono'){
                                    persona = <PersonaInterface>await Persona.update( {telefono:persona.telefono} ,
                                         {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                         actualizado = true;
                                }else{
                                    if(item=='email'){
                                        const Op = Sequelize.Op;
                                        let consultaPorEmail = await Persona.findAll( {where:{email: {[Op.iLike]: '%'+persona.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                        if(consultaPorEmail.length>0){
                                            errorRet = 1;
                                            msg = 'Ya existe una persona con este email';
                                            winston.error(uuid+"[ERROR]->"+msg);
                                        }else{
                                            persona = <PersonaInterface>await Persona.update( {email:persona.email} ,
                                                {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                actualizado = true;  
                                        }
                                    }else{
                                        if(item=='cedula'){
                                            let consultaPorCedula = await Persona.findAll( {where:{cedula:persona.cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                            if(consultaPorCedula.length>0){
                                                errorRet = 1;
                                                msg = 'Ya existe una persona con esta cédula';
                                                winston.error(uuid+"[ERROR]->"+msg);
                                            }else{
                                                persona = <PersonaInterface>await Persona.update( {cedula:persona.cedula} ,
                                                    {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                    actualizado = true; 
                                            }
                                        }else{
                                            if(item=='clave'){
                                                persona = <PersonaInterface>await Persona.update( {clave:persona.clave} ,
                                                     {where:{idpersona:persona.idpersona},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                     actualizado = true;
                                            }else{
                                                if(item=='todo'){
                                                    persona = <PersonaInterface>await Persona.upsert( persona,
                                                        {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                        actualizado = true;
                                                }else{
                                                    if(item=='nuevo'){
                                                        const Op = Sequelize.Op;
                                                        let consultaPorEmail = await Persona.findAll( {where:{email: {[Op.iLike]: '%'+persona.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                        if(consultaPorEmail.length>0){
                                                            errorRet = 1;
                                                            msg = 'Ya existe una persona con este email';
                                                            winston.error(uuid+"[ERROR]->"+msg);
                                                        }else{
                                                            let consultaPorCedula = await Persona.findAll( {where:{cedula:persona.cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                            if(consultaPorCedula.length>0){
                                                                errorRet = 1;
                                                                msg = 'Ya existe una persona con esta cédula';
                                                                winston.error(uuid+"[ERROR]->"+msg);
                                                            }else{
                                                                persona = <PersonaInterface>await Persona.create( 
                                                                    {
                                                                        cedula:persona.cedula,
                                                                        nombre:persona.nombre,
                                                                        direccion:persona.direccion,
                                                                        telefono:persona.telefono,
                                                                        email:persona.email,
                                                                        clave:persona.clave,
                                                                        activo:false
                                                                    },
                                                                     {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
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
                    if(actualizado){
                        msg = "actualizacion exitosa";
                        winston.info(uuid+"[OK]->"+msg);
                    }else{
                        errorRet = 1;                   
                        winston.error(uuid+"[ERROR]->"+msg);
                    }
                }else{
                    if(item=='nuevo'){
                        const Op = Sequelize.Op;
                        let consultaPorEmail = await Persona.findAll( {where:{email: {[Op.iLike]: '%'+persona.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                        if(consultaPorEmail.length>0){
                            errorRet = 1;
                            msg = 'Ya existe una persona con este email';
                            winston.error(uuid+"[ERROR]->"+msg);
                        }else{
                            let consultaPorCedula = await Persona.findAll( {where:{cedula:persona.cedula},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                            if(consultaPorCedula.length>0){
                                errorRet = 1;
                                msg = 'Ya existe una persona con esta cédula';
                                winston.error(uuid+"[ERROR]->"+msg);
                            }else{
                                persona = <PersonaInterface>await Persona.create( 
                                    {
                                        cedula:persona.cedula,
                                        nombre:persona.nombre,
                                        direccion:persona.direccion,
                                        telefono:persona.telefono,
                                        email:persona.email,
                                        clave:persona.clave,
                                        activo:false
                                    },
                                        {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                        msg = 'Registro de nueva persona ok';
                                        actualizado = true;       
                            }
                        }
                    }else{
                        errorRet = 1;
                        msg = 'Se presentó un arror al tratar de obtener el objeto persona';
                        winston.error(uuid+"[ERROR]->"+msg);
                    }                
                }            
            }catch(error){
                errorRet = 1;
                msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos '+error;
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg
    });
}



