"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Departamento = connection_1.default.define('departamento', {
    iddepartamento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    }
}, {
    schema: 'autos',
    timestamps: false
});
exports.default = Departamento;
//# sourceMappingURL=departamento%20copy.js.map