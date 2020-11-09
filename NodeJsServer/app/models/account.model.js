module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        accountType: {
            type: Sequelize.INTEGER
        },
        idCard: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.INTEGER
        },
        online: {
            type: Sequelize.INTEGER
        }
    });
    
    return Account;

};