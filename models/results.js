'use strict';
module.exports = (sequelize, DataTypes) => {
  var Results = sequelize.define('Results', {
    rms_total: DataTypes.FLOAT,
    peak: DataTypes.FLOAT,
    crest: DataTypes.FLOAT,
    Failure: DataTypes.BOOLEAN
  }, {});
  Results.associate = function(models) {
    // associations can be defined here
  };
  return Results;
};