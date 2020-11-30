module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comments", {
        commentID: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        parentCommentID: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        content: {
            type: DataTypes.TEXT
        },
        verifiedStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,
    });

    return Comment;
};