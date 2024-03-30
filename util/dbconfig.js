const Sequelize = require('sequelize');

const sequelize = new Sequelize('users', 'root', '9752', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;