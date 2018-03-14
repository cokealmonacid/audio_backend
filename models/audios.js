'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Audios', {
    content     : {type: DataTypes.TEXT, allowNull: false}, 
    Spectre     : {type: DataTypes.FLOAT, allowNull: true},
    code        : {type: DataTypes.STRING, allowNull: false},
  });

  Model.associate = function(models) {
      this.Users = this.belongsTo(models.User);
      this.Transformers = this.belongsTo(models.Transformers);
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};