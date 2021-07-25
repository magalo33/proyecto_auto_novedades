"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const persona_1 = __importDefault(require("./persona"));
const rol_1 = __importDefault(require("./rol"));
const RolesxPersona = connection_1.default.define('rolesxpersona', {
    idrolesxpersona: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    idrol: {
        type: sequelize_1.DataTypes.BIGINT
    },
    idpersona: {
        type: sequelize_1.DataTypes.BIGINT
    }
}, {
    schema: 'autos',
    timestamps: false,
    freezeTableName: true
});
RolesxPersona.belongsTo(rol_1.default, { as: 'rol', foreignKey: 'idrol' });
RolesxPersona.belongsTo(persona_1.default, { as: 'persona', foreignKey: 'idpersona' });
exports.default = RolesxPersona;
//# sourceMappingURL=rolesxpersona.js.map