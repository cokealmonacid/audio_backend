'use strict';

const Transformers          = require('../models').Transformers;

module.exports = (sequelize, DataTypes) => {
   var Model = sequelize.define('Failures', {
	    content     : {type: DataTypes.TEXT, allowNull: false}, 
	    Spectre     : {type: DataTypes.FLOAT, allowNull: false},
  	});

  	Model.associate = function(models){
      	this.Transformers = this.belongsTo(models.Transformers);
  	};

  	return Model;
};