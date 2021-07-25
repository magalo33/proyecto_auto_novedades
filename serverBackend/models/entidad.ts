import { DataTypes } from 'sequelize';
import db from '../bd/connection';

const Entidad = db.define('entidades',{
    identidad:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true
    },
    nit:{
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
    activo:{
        type: DataTypes.BOOLEAN
    }
},
{
    schema: 'autos'/*,
    timestamps: false*/
});

export default Entidad;