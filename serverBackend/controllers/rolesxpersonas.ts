import { Request, Response } from 'express';
import Utilities from '../utilities/utilities';
import  { QueryTypes } from 'sequelize';
const winston = require('../winston/config');
import db from '../bd/connection';
import { RolesXpersona, RolXpersona } from '../models/interfaces/rolesxpersona';
import { RolesXpersonaInterface } from '../models/interfaces/rolesxpersonas.interface';
import RolesxPersona from '../models/rolesxpersona';



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
export const getRolesXpersonas = async ( req: Request,resp: Response )=>{
    let msg = '';
    let errorRet = 0;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    let rolesxpersonas = {};
    msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->getRolesXpersonas]";
    if(msg == "Ok"){
        try{
            rolesxpersonas = await db.query(
                " select "+
                " per.idpersona, "+
                " per.cedula, "+
                " per.nombre, "+
                " per.direccion, "+
                " per.telefono, "+
                " per.email, "+
                " '**--' as clave, "+            
                " per.activo, "+
                " per.\"createdAt\", "+
                " per.\"updatedAt\", "+
                " rol.idrol, "+
                " rol.descripcion, "+
                " autxper.idrolesxpersona "+
                " from autos.rolesxpersona autxper, autos.personas per,autos.roles rol "+
                " where  autxper.idpersona=per.idpersona and autxper.idrol=rol.idrol "+
                " order by per.nombre",
            { type: QueryTypes.SELECT });
                msg = 'consulta exitosa';
            winston.info(uuid+"[OK]->"+msg);
        }catch(error){
            errorRet = 1;
            msg = 'Se presentó un error al tratar de obtener la informacion de la base de datos \n'+error;
            winston.error(uuid+"[ERROR]->"+msg);
        }            
    }else{
        errorRet = 1;
        winston.error(uuid+"[ERROR]->"+msg);
    }
    resp.json({
        error: errorRet,
        msg: msg,
        rolesxpersonas
    });    
}

export const updateRolXpersona = async ( req: Request,resp: Response )=>{
    let msg = '';
    let errorRet = 0;
    const utilities = new Utilities();
    let uuid = utilities.getToken();
    msg = utilities.validateMessage(req.headers, req.body,uuid);
    uuid = uuid + "[METODO->updateRolXpersona]";
    let arrayRolesxpersona:RolXpersona[] = new Array();
    let rolesXpersona:RolesXpersona = {
        error: errorRet,
        msg: msg,
        rolesxpersona: arrayRolesxpersona
    };
    if(msg == "Ok"){
        try{
            let errorRet = 1;
            msg = 'No se realizo la actualización. Verifique el parametro de control';
            rolesXpersona  = await utilities.validarLigin(req.headers,uuid);       
            errorRet = rolesXpersona.error;
            msg = rolesXpersona.msg;

            if(errorRet == 0){
                let rxpRequest:RolesXpersonaInterface = utilities.getRolesXpersonaDesdeHeader(req.headers,uuid);

                console.log('request\n');
                console.log('request\n');
                console.log('request\n');
                console.log(rxpRequest);
                console.log('request\n');
                console.log('request\n');
                console.log('request\n');


                const rpp = <RolesXpersonaInterface>await RolesxPersona.upsert( rxpRequest,
                    {logging: (sql) => winston.info(uuid+"[SQL]"+sql)} ).then(()=>{
                        errorRet = 0;
                        msg = 'Edición ok';
                    });  
            }else{
                errorRet = 1;
                winston.error(uuid+"[ERROR]->"+msg);
            }
        }catch(error){
            errorRet = 1;
            winston.error(uuid+"[ERROR]->"+error);
        }
            
    }
    resp.json({
        error: errorRet,
        msg: msg
    });  
      
}

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