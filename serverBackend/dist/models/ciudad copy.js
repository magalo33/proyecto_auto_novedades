"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Ciudad = connection_1.default.define('ciudades', {
    idciudad: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    iddepartamento: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    schema: 'autos',
    timestamps: false
});
exports.default = Ciudad;
//# sourceMappingURL=ciudad%20copy.js.map