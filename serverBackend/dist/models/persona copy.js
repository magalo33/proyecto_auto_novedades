"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Persona = connection_1.default.define('personas', {
    idpersona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    cedula: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    clave: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    schema: 'autos',
    timestamps: false
});
exports.default = Persona;
//# sourceMappingURL=persona%20copy.js.map