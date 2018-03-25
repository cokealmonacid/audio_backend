'use strict';

const Transformers          = require('../models').Transformers;

module.exports = (sequelize, DataTypes) => {
   var Model = sequelize.define('Failures', {
	    content     : {type: DataTypes.TEXT, allowNull: false},
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