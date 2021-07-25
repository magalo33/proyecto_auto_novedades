"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../bd/connection"));
const Persona2 = connection_1.default.define('personas', {
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
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    schema: 'autos',
    timestamps: false
});
exports.default = Persona2;
//# sourceMappingURL=persona2.js.map