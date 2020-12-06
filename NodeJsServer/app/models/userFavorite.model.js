module.exports = (sequelize, DataTypes) => {
    const UserFavorite = sequelize.define("userfavorite", {
        
    }, 
    {
        timestamps: false
    });
    
    return UserFavorite;

};