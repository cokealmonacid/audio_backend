'use strict';

const Transformers          = require('../models').Transformers;

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Code', {
    description: { type:DataTypes.STRING, allowNull: false }
  });

  Model.associate = function(models) {
  	 this.Transformers = this.belongsTo(models.Transformers);
  };

  Model.prototype.toWeb = function (pw) {
  	let json = this.toJSON();
  	return json;
  }
  
  return Model;
};