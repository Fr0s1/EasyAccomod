module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        idCard: {
            type: Sequelize.STRING(20),
            primaryKey: true
        },
        fullName: {
            type: Sequelize.STRING(30)
        },
        phoneNumber: {
            type: Sequelize.STRING(20)
        },
        email: {
            type: Sequelize.STRING(30)
        },
        address: {
            type: Sequelize.TEXT
        }
    }, {
        tableName: "users",
        timestamps: false,
    })

    return User;
};