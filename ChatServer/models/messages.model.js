module.exports = function (sequelize, DataTypes) {
    const Messages = sequelize.define('messages', {
        content: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: true,
        updatedAt: false
    });

    Messages.removeAttribute('id')

    return Messages
};
