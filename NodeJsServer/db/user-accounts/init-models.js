var DataTypes = require("sequelize").DataTypes;
var _useraccounts = require("./useraccounts");

function initModels(sequelize) {
  var useraccounts = _useraccounts(sequelize, DataTypes);


  return {
    useraccounts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
