module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        idCard: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        fullName: {
            type: DataTypes.STRING(30)
        },
        phoneNumber: {
            type: DataTypes.STRING(20)
        },
        email: {
            type: DataTypes.STRING(30)
        },
        address: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: "users",
        timestamps: false,
    })

    return User;
};