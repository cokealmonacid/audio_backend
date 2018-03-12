'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transformers = sequelize.define('Transformers', {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  Transformers.associate = function(models) {
    // associations can be defined here
  };
  return Transformers;
};