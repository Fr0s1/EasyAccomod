module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(20)
        },
        accountType: {
            type: Sequelize.STRING(10)
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        online: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
    
    return Account;

};