const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '4364',
    database: 'elbit-project',
});



module.exports = {sequelize,Sequelize};
