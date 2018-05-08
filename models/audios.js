'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Audios', {
    name        : {type: DataTypes.TEXT, allowNull: false},
    content     : {type: DataTypes.TEXT('long'), allowNull: false}, 
    analysis    : {type: DataTypes.BOOLEAN, allowNull: false}
  });

  Model.associate = function(models) {
      this.Users = this.belongsTo(models.User);
      this.Transformers = this.belongsTo(models.Transformers);
      this.Codes = this.belongsTo(models.Code);
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};