const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    timezone: '+07:00'
});

const Account = require('./account.model')(sequelize, DataTypes)
const Messages = require('./messages.model')(sequelize, DataTypes)
const ContactList = require('./contactList.model')(sequelize, DataTypes)

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