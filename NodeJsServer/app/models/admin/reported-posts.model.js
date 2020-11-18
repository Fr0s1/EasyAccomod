const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
    const ReportedPost = sequelize.define('ReportedPost', {
        postID: {
            type: DataTypes.STRING(32).UNSIGNED
        },
        username: {
            type: DataTypes.STRING(20)
        }, 
        reportContent: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: "reportedPosts",
        timestamps: false
    })

    ReportedPost.removeAttribute('id')

    return ReportedPost
}