import { DataTypes } from 'sequelize';
import db from '../bd/connection';

const Ciudad = db.define('ciudades',{
    idciudad:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true
    },
    iddepartamento:{
        type: DataTypes.INTEGER
    },
    descripcion:{
        type: DataTypes.STRING
    }
},
{
    schema: 'autos',
    timestamps: false
});

export default Ciudad;