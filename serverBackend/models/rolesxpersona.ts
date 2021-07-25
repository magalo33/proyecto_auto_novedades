import { DataTypes } from 'sequelize';
import db from '../bd/connection';
import Persona from './persona';
import Roles from './rol';

const RolesxPersona = db.define('rolesxpersona',{
    idrolesxpersona:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true
    },
    idrol:{
        type: DataTypes.BIGINT
    },
    idpersona:{
        type: DataTypes.BIGINT
    }
},
{
    schema: 'autos',
    timestamps: false,
    freezeTableName: true
});

RolesxPersona.belongsTo(Roles, { as: 'rol',foreignKey:'idrol' });
RolesxPersona.belongsTo(Persona, { as: 'persona',foreignKey:'idpersona' });

export default RolesxPersona;