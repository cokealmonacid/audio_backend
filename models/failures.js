'use strict';

module.exports = (sequelize, DataTypes) => {
   var Failures = sequelize.define('Failures', {
	    content     : {type: DataTypes.TEXT, allowNull: false}, 
	    Spectre     : {type: DataTypes.FLOAT, allowNull: false},
  	});


  	Model.associate = function(models){
      	this.Transformers = this.belongsTo(models.Transformers);
  	};


  	return Failures;
};