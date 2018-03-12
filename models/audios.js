'use strict';
module.exports = (sequelize, DataTypes) => {
  var Audios = sequelize.define('Audios', {
    content: DataTypes.STRING,
    Spectre: DataTypes.FLOAT,
    date_sample: DataTypes.DATE,
    code: DataTypes.STRING
  }, {});
  Audios.associate = function(models) {
    // associations can be defined here
  };
  return Audios;
};