/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roomType: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    rented: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    sharedOwner: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    usernameOwner: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'useraccounts',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "roomOwner",
        using: "BTREE",
        fields: [
          { name: "usernameOwner" },
        ]
      },
    ]
  });
};
