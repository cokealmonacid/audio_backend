'use strict';

module.exports = (sequelize, DataTypes) => {
   var Model = sequelize.define('Failures', {
      description : {type: DataTypes.TEXT, allowNull: false},
	    content     : {type: DataTypes.TEXT('long'), allowNull: false},
  	});

	Model.prototype.toWeb = function (pw) {
	    let json = this.toJSON();
	    return json;
	};

  	return Model;
};