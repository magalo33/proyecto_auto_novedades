import { DataTypes } from 'sequelize';
import db from '../bd/connection';
import Entidad from './entidad';
import Persona from './persona';

const Contacto = db.define('contactos',{
    idcontacto:{
        type: DataTypes.BIGINT, 
        primaryKey: true,
        autoIncrement: true,
        field: 'idcontacto'
    },
    idpersona:{
        type: DataTypes.BIGINT,
        /*references: {
            model: Persona,
            key: 'idpersona'
          }*/        
    },
    identidad:{
        type: DataTypes.BIGINT,
        /*references: {
            model: Entidad,
            key: 'identidad'
          }*/ 
    },
    cargo:{
        type: DataTypes.STRING
    },
    telefono:{
        type: DataTypes.STRING
    }
},
{
    schema: 'autos',
    timestamps: false,
});

Contacto.belongsTo(Persona, { as: 'Persona',foreignKey:'idpersona' });
Contacto.belongsTo(Entidad, { as: 'Entidad',foreignKey:'identidad' });

export default Contacto;