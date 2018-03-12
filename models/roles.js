'use strict';

module.exports = (sequelize, DataTypes) => {
  var Roles = sequelize.define('Roles', {
    description  : {type: DataTypes.STRING, allowNull: false, unique: false},
  });

  Roles.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Roles;
};