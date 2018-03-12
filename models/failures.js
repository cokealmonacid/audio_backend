'use strict';
module.exports = (sequelize, DataTypes) => {
  var Failures = sequelize.define('Failures', {
    content: DataTypes.STRING,
    spectre: DataTypes.FLOAT
  }, {});
  Failures.associate = function(models) {
    // associations can be defined here
  };
  return Failures;
};