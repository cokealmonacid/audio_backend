'use strict';

module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Transformers', {
	    brand : {type: DataTypes.STRING, allowNull: false, unique: false},
	    model : {type: DataTypes.STRING, allowNull: false, unique: false},
	    year  : {type: DataTypes.INTEGER, allowNull: false, unique: false},
	});

 	Model.prototype.toWeb = function (pw) {
	    let json = this.toJSON();
	    return json;
	};

  return Model;
};