module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        postID: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        postName: {
            type: DataTypes.TEXT
        },
        postTime: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        expiredTime: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        verifiedStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        viewsNumber: {
            type: DataTypes.INTEGER(32),
            defaultValue: 0
        },
        likesNumber: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            defaultValue: 0
        },
        starsReview: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        postWeek: {
            type: DataTypes.INTEGER(8).UNSIGNED,
            defaultValue: 1
        },
        postMonth: {
            type: DataTypes.INTEGER(8).UNSIGNED,
            defaultValue: 0
        },
        postYear: {
            type: DataTypes.INTEGER(8).UNSIGNED,
            defaultValue: 0
        },
        postCost: {
            type: DataTypes.INTEGER(32).UNSIGNED,
        },
        paidAmount: {
            type: DataTypes.INTEGER(32).UNSIGNED,
            defaultValue: 0
        },
        paymentStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'posts',
        timestamps: true,
        createdAt: true,
        updatedAt: false
    })
}