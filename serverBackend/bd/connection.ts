import { Sequelize } from "sequelize";

const db = new Sequelize('autonovedades','postgres','Magalo33@88230510',{
    host: 'localhost',
    port: 5551,
    dialect: 'postgres',
    //logging: true
});

export default db;