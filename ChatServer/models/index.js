const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    timezone: '+07:00'
});

const Account = require('../../NodeJsServer/app/models/account.model')(sequelize, DataTypes)
const Messages = require('../models/messages.model')(sequelize, DataTypes)
const ContactList = require('../models/contactList.model')(sequelize, DataTypes)

Account.belongsToMany(Account, {
    as: 'Message', through: {
        model: Messages,
        unique: false
    },
    foreignKey: 'sender', otherKey: 'receiver', constraint: false
})

Account.belongsToMany(Account, {
    as: 'ContactList', through: {
        model: ContactList,
    },
    foreignKey: 'sender', otherKey: 'receiver'
})

const db = {
    Messages,
    Account,
    ContactList
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db