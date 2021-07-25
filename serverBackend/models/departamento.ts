import { DataTypes } from 'sequelize';
import db from '../bd/connection';

const Departamento = db.define('departamentos',{
    iddepartamento:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true
    },
    descripcion:{
        type: DataTypes.STRING
    }
},
{
    schema: 'autos',
    timestamps: false
});

export default Departamento;
