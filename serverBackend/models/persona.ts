import { DataTypes } from 'sequelize';
import db from '../bd/connection';

const Persona = db.define('personas',{
    idpersona:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true
    },
    cedula:{
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    clave:{
        type: DataTypes.STRING
    },
    activo:{
        type: DataTypes.BOOLEAN
    }
},
{
    schema: 'autos'/*,
    timestamps: false*/
});

export default Persona;