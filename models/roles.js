'use strict';
module.exports = (sequelize, DataTypes) => {
  var Roles = sequelize.define('Roles', {
    description: DataTypes.
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here
  };
  return Roles;
};