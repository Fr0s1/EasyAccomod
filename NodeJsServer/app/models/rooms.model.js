module.exports = (sequelize, DataTypes) => {
    const Rooms = sequelize.define('Rooms', {
        roomID: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        roomType: {
            type: DataTypes.STRING(30)
        },
        rented: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sharedOwner: {
            type: DataTypes.BOOLEAN
        },
        area: {
            type: DataTypes.INTEGER(10)
        },
        description: {
            type: DataTypes.TEXT
        },
        homeNumber: {
            type: DataTypes.INTEGER(10).UNSIGNED
        },
        street: {
            type: DataTypes.STRING(30)
        },
        ward: {
            type: DataTypes.STRING(30)
        },
        district: {
            type: DataTypes.STRING(30)
        },
        city: {
            type: DataTypes.STRING(30)
        },
        monthPrice: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        quarterPrice: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        yearPrice: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        bathroom: {
            type: DataTypes.TEXT
        },
        kitchen: {
            type: DataTypes.TEXT
        },
        airconditioner: {
            type: DataTypes.BOOLEAN
        },
        balcony: {
            type: DataTypes.BOOLEAN
        },
        electricityPrice: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        waterPrice: {
            type: DataTypes.INTEGER(32).UNSIGNED
        },
        imageURI: {
            type: DataTypes.TEXT
        },
        otherUtils: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'rooms',
        timestamps: false,
    })

    return Rooms
};