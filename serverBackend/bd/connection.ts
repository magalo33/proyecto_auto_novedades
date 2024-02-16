import { Sequelize } from "sequelize";

const db = new Sequelize('autonovedades','postgres','xxxxxxxxxxxxxxxxxxxxxxxxxxxx',{
    host: 'localhost',
    port: 5551,
    dialect: 'postgres',
    //logging: true
});

export default db;
