const Sequelize = require('sequelize');
// Chi phí bài đăng
module.exports = function (sequelize, DataTypes) {
  const PostCost = sequelize.define('postcost', {
    weekCost: {
      type: DataTypes.INTEGER(32).UNSIGNED,
      allowNull: false
    },
    monthCost: {
      type: DataTypes.INTEGER(32).UNSIGNED,
      allowNull: false
    },
    yearCost: {
      type: DataTypes.INTEGER(32).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'postcost',
    timestamps: false
  });

  PostCost.removeAttribute('id')

  return PostCost
};
