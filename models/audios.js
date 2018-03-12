'use strict';

module.exports = (sequelize, DataTypes) => {
  var Audios = sequelize.define('Audios', {
    content     : {type: DataTypes.TEXT, allowNull: false}, 
    Spectre     : {type: DataTypes.FLOAT, allowNull: false},
    date_sample : {type: DataTypes.DATEONLY, allowNull: false},
    code        : {type: DataTypes.STRING, allowNull: false},
  });

  Audios.associate = function(models) {
      this.Users = this.belongsTo(models.Users);
      this.Transformers = this.belongsTo(models.Transformers);
  };
  return Audios;
};