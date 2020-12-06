module.exports = (sequelize, DataTypes) => {
    const ReportedPosts = sequelize.define("reportedPosts", {
        reportID: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT
        },
    }, {
        timestamps: true,
        createdAt: 'reportedAt'
    });

    return ReportedPosts;
};