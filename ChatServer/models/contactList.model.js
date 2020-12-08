module.exports = function (sequelize, DataTypes) {
    const ContactList = sequelize.define('contactList', {

    }, {
        timestamps: false
    });

    ContactList.removeAttribute('id')

    return ContactList
};
