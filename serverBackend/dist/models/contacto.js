"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const entidad_1 = __importDefault(require("./entidad"));
const persona_1 = __importDefault(require("./persona"));
const Contacto = connection_1.default.define('contactos', {
    idcontacto: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: 'idcontacto'
    },
    idpersona: {
        type: sequelize_1.DataTypes.BIGINT,
        /*references: {
            model: Persona,
            key: 'idpersona'
          }*/
    },
    identidad: {
        type: sequelize_1.DataTypes.BIGINT,
        /*references: {
            model: Entidad,
            key: 'identidad'
          }*/
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    schema: 'autos',
    timestamps: false,
});
Contacto.belongsTo(persona_1.default, { as: 'Persona', foreignKey: 'idpersona' });
Contacto.belongsTo(entidad_1.default, { as: 'Entidad', foreignKey: 'identidad' });
exports.default = Contacto;
//# sourceMappingURL=contacto.js.map