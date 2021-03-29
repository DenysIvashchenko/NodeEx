const Sequelize = require('sequelize');

const sequelize = new Sequelize('node1', 'root', 'root', {
    dialect: "mysql",
    host: "localhost"
});

const User = require('./Users')(sequelize);

module.exports = {
    sequelize: sequelize,
    user: User
};