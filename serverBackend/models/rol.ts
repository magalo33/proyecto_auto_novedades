import { DataTypes } from 'sequelize';
import db from '../bd/connection';

const Roles = db.define('roles',{
    idrol:{
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

export default Roles;