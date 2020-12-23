module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("notification", {
        postID: { 
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        postName: {
            type: DataTypes.TEXT
        },
        type: {
            type: DataTypes.INTEGER(32).UNSIGNED
        }

    }, {
        timestamps: true,
        createdAt: true
    });
    
    return Notification;

};