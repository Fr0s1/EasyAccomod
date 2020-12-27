module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ExtendRequest', {
        newExpireDate: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        price: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            defaultValue: 0
        }
    })
}