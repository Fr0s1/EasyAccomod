module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        password: {
            type: Sequelize.TEXT
        },
        accountType: {
            type: Sequelize.STRING(10)
        },
        state: {
            type: Sequelize.BOOLEAN
        },
        online: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false
    });
    
    return Account;

};