'use strict';

module.exports = (sequelize, DataTypes) => {
  var Results = sequelize.define('Results', {
      rms_total   : {type: DataTypes.FLOAT, allowNull: false},
      peak        : {type: DataTypes.FLOAT, allowNull: false},
      crest       : {type: DataTypes.FLOAT, allowNull: false},
      Failure     : {type: DataTypes.BOOLEAN, allowNull: false},
      Date_result : {type: DataTypes.DATEONLY, allowNull: false},
  });

  Results.associate = function(models) {
      this.Audios = this.belongsTo(models.Audios);
      this.Transformers = this.belongsTo(models.Transformers);
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Results;
};