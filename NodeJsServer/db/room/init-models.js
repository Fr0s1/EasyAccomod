var DataTypes = require("sequelize").DataTypes;
var _room = require("./room");

function initModels(sequelize) {
  var room = _room(sequelize, DataTypes);

  room.belongsTo(useraccounts, { foreignKey: "usernameOwner"});
  useraccounts.hasMany(room, { foreignKey: "usernameOwner"});

  return {
    room,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
