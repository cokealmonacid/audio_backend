'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Results', {
      rms_total   : {type: DataTypes.FLOAT, allowNull: false},
      peak        : {type: DataTypes.FLOAT, allowNull: false},
      crest       : {type: DataTypes.FLOAT, allowNull: false},
      frequency_1 : {type: DataTypes.FLOAT, allowNull: false},
      frequency_2 : {type: DataTypes.FLOAT, allowNull: false},
      failure     : {type: DataTypes.BOOLEAN, allowNull: false},
      date_result : {type: DataTypes.DATEONLY, allowNull: false},
  });

  Model.associate = function(models) {
      this.Audios = this.belongsTo(models.Audios);
      this.Transformers = this.belongsTo(models.Transformers);
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};