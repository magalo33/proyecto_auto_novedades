"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../bd/connection"));
const Roles = connection_1.default.define('roles', {
    idrol: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    schema: 'autos',
    timestamps: false
});
exports.default = Roles;
//# sourceMappingURL=rol.js.map