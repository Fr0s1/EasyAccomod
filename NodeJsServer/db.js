// Kết nối tới local db mysql của phpMyAdmin
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('easyaccomod', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    async function f() {
        await sequelize.authenticate()
    }

    f()

    console.log('Connection has been established successfully.');

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize