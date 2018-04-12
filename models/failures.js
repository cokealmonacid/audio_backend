'use strict';

const Transformers          = require('../models').Transformers;

module.exports = (sequelize, DataTypes) => {
   var Model = sequelize.define('Failures', {
      description : {type: DataTypes.TEXT, allowNull: false},
	    content     : {type: DataTypes.TEXT('long'), allowNull: false},
  	});

  	Model.associate = function(models){
      	this.Transformers = this.belongsTo(models.Transformers);
  	};

	Model.prototype.toWeb = function (pw) {
	    let json = this.toJSON();
	    return json;
	};

  	return Model;
};