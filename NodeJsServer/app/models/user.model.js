module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        idCard: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
    });
    
    return User;
    
  };