var Sequelize = require('sequelize');
const application = require('../application.json')
var sequelize = new Sequelize(application.database, application.username, application.password, {
    host: application.host,
    dialect: 'mysql'
})
var User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
//sequelize.sync();
module.exports = User;