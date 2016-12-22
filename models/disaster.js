'use strict';
module.exports = function(sequelize, DataTypes) {
  var disaster = sequelize.define('disaster', {
    country: DataTypes.STRING,
    disaster_type: DataTypes.STRING,
    casualties: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return disaster;
};