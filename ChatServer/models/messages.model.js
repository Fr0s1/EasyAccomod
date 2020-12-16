module.exports = function (sequelize, DataTypes) {
    const Messages = sequelize.define('messages', {
        messageID: {
            type: DataTypes.INTEGER(64).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: true,
        updatedAt: false
    });

    return Messages
};
