module.exports = function (sequelize, DataTypes) {
    const ContactList = sequelize.define('contactList', {
        
    }, {
        timestamps: false,
    });

    return ContactList
};
