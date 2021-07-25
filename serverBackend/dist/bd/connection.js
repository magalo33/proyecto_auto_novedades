"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('autonovedades', 'postgres', 'Magalo33@88230510', {
    host: 'localhost',
    port: 5551,
    dialect: 'postgres',
    //logging: true
});
exports.default = db;
//# sourceMappingURL=connection.js.map