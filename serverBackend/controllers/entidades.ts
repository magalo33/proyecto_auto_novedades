import { Request, Response } from 'express';
import Utilities from '../utilities/utilities';
import Sequelize from 'sequelize';
//import { PersonaInterface } from '../models/interfaces/persona.interface';
import Entidad from '../models/entidad';
import { EntidadInterface } from '../models/interfaces/entidad.interface';
import { RolesXpersona, RolXpersona } from '../models/interfaces/rolesxpersona';
const winston = require('../winston/config');

/*
    Retorna un listado de todas las entidades en la base de datos
*/
export const getEntidades = async ( req: Request,resp: Response )=>{
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidades]";
    let entidades = {};
    if(msg == "Ok"){
        try{
            entidades = await Entidad.findAll({order:["nombre"],logging: (sql) => winston.info(uuid+"[SQL]"+sql)}).then();
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
        entidades
    });    
}

/*
    Retorna una entidad por su id
*/

export const getEntidad = async ( req: Request,resp: Response )=>{
    const { id } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidad]";
    let entidad = {};
    if(msg == "Ok"){
        try{
            entidad = await Entidad.findByPk( id,{logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(entidad){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                entidad = {};
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
        entidad
    });
}


/*
    Retorna una entidad por su nit
*/
export const getEntidadPorNit = async ( req: Request,resp: Response )=>{
    const { nit } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidadPorNit]";
    let entidad = new Array();
    if(msg == "Ok"){
        try{
            entidad = await Entidad.findAll( {order:["nombre"],where:{nit:nit},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(entidad.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                entidad = new Array();
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
        entidad
    });
}


/*
    Retorna una entidad por su nombre
*/
export const getEntidadPorNombre = async ( req: Request,resp: Response )=>{
    const { nombre } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidadPorNombre]";
    let entidad = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            entidad = await Entidad.findAll( {order:["nombre"],where:{nombre: {[Op.iLike]: '%'+nombre+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(entidad.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                entidad = new Array();
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
        entidad
    });
}

/*
    Retorna una entidad por su telefono
*/
export const getEntidadPorTelefono = async ( req: Request,resp: Response )=>{
    const { telefono } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidadPorTelefono]";
    let entidad = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            entidad = await Entidad.findAll( {order:["nombre"],where:{telefono: {[Op.iLike]: '%'+telefono+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(entidad.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                entidad = new Array();
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
        entidad
    });
}

/*
    Retorna una persona por su email
*/
export const getEntidadPorEmail = async ( req: Request,resp: Response )=>{
    const { email } = req.params;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0; 
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getEntidadPorEmail]";
    let entidad = new Array();
    const Op = Sequelize.Op;
    if(msg == "Ok"){
        try{
            entidad = await Entidad.findAll( {order:["nombre"],where:{email: {[Op.iLike]: '%'+email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
            if(entidad.length>0){
                winston.info(uuid+"[OK]->consulta exitosa");
            }else{
                entidad = new Array();
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
        entidad
    });
}

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
export const actualizarEntidad = async ( req: Request,resp: Response )=>{
    const { item } = req.params;/*Path de control*/
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let errorRet = 0;     
    let msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->actualizarEntidad]";
    let entidad:EntidadInterface = utilities.getEntidadInterface();
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
                entidad = utilities.getEntidadDesdeBody(req.headers,uuid);
                if(entidad.identidad>0){
                    if(item=='estado'){
                        entidad = <EntidadInterface>await Entidad.update( {activo:entidad.activo} ,
                             {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                             actualizado = true;
                    }else{
                        if(item=='nombre'){
                            entidad = <EntidadInterface>await Entidad.update( {nombre:entidad.nombre} ,
                                 {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                 actualizado = true;
                        }else{
                            if(item=='direccion'){
                                entidad = <EntidadInterface>await Entidad.update( {direccion:entidad.direccion} ,
                                     {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                     actualizado = true;
                            }else{
                                if(item=='telefono'){
                                    entidad = <EntidadInterface>await Entidad.update( {telefono:entidad.telefono} ,
                                         {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                         actualizado = true;
                                }else{
                                    if(item=='email'){
                                        const Op = Sequelize.Op;
                                        let consultaPorEmail = await Entidad.findAll( {where:{email: {[Op.iLike]: '%'+entidad.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                        if(consultaPorEmail.length>0){
                                            errorRet = 1;
                                            msg = 'Ya existe una entidad con este email';
                                            winston.error(uuid+"[ERROR]->"+msg);
                                        }else{
                                            entidad = <EntidadInterface>await Entidad.update( {email:entidad.email} ,
                                                {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                actualizado = true;  
                                        }
                                    }else{
                                        if(item=='nit'){
                                            let consultaPorCedula = await Entidad.findAll( {where:{nit:entidad.nit},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                            if(consultaPorCedula.length>0){
                                                errorRet = 1;
                                                msg = 'Ya existe una entidad con este nit';
                                                winston.error(uuid+"[ERROR]->"+msg);
                                            }else{
                                                entidad = <EntidadInterface>await Entidad.update( {nit:entidad.nit} ,
                                                    {where:{identidad:entidad.identidad},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                    actualizado = true; 
                                            }
                                        }else{
                                            if(item=='todo'){
                                                entidad = <EntidadInterface>await Entidad.upsert( entidad,
                                                    {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                    actualizado = true;                                      
                                            }else{
                                                if(item=='nuevo'){
                                                    const Op = Sequelize.Op;
                                                    let consultaPorEmail = await Entidad.findAll( {where:{email: {[Op.iLike]: '%'+entidad.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                    if(consultaPorEmail.length>0){
                                                        errorRet = 1;
                                                        msg = 'Ya existe una entidad con este email';
                                                        winston.error(uuid+"[ERROR]->"+msg);
                                                    }else{
                                                        let consultaPorNit = await Entidad.findAll( {where:{nit:entidad.nit},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                                        if(consultaPorNit.length>0){
                                                            errorRet = 1;
                                                            msg = 'Ya existe una entidad con este nit';
                                                            winston.error(uuid+"[ERROR]->"+msg);
                                                        }else{
                                                            entidad = <EntidadInterface>await Entidad.create( 
                                                                {
                                                                    nit:entidad.nit,
                                                                    nombre:entidad.nombre,
                                                                    direccion:entidad.direccion,
                                                                    telefono:entidad.telefono,
                                                                    email:entidad.email,
                                                                    activo:false
                                                                },
                                                                 {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
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
                            let consultaPorEmail = await Entidad.findAll( {where:{email: {[Op.iLike]: '%'+entidad.email+'%'}},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                            if(consultaPorEmail.length>0){
                                errorRet = 1;
                                msg = 'Ya existe una entidad con este email';
                                winston.error(uuid+"[ERROR]->"+msg);
                            }else{
                                let consultaPorNit = await Entidad.findAll( {where:{nit:entidad.nit},logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                if(consultaPorNit.length>0){
                                    errorRet = 1;
                                    msg = 'Ya existe una entidad con este nit';
                                    winston.error(uuid+"[ERROR]->"+msg);
                                }else{
                                    entidad = <EntidadInterface>await Entidad.create( 
                                        {
                                            nit:entidad.nit,
                                            nombre:entidad.nombre,
                                            direccion:entidad.direccion,
                                            telefono:entidad.telefono,
                                            email:entidad.email,
                                            activo:false
                                        },
                                            {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then();
                                            msg = 'Registro de nueva entidad ok';
                                            actualizado = true;       
                                }
                            }
                        }else{
                            errorRet = 1;
                            msg = 'Se presentó un arror al tratar de obtener el objeto entidad';
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
