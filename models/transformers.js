'use strict';

module.exports = (sequelize, DataTypes) => {
	var Model = sequelize.define('Transformers', {
		name_s_e    : {type: DataTypes.STRING, allowNull: false, unique: false},
		designation : {type: DataTypes.STRING, allowNull: false, unique: false},
	    brand       : {type: DataTypes.STRING, allowNull: false, unique: false},
	    trans_rel   : {type: DataTypes.STRING, allowNull: false, unique: false},
	    year        : {type: DataTypes.INTEGER, allowNull: false, unique: false},
	});

 	Model.prototype.toWeb = function (pw) {
	    let json = this.toJSON();
	    return json;
	};

  return Model;
};