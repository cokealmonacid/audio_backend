'use strict';

module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    name	 : { type:DataTypes.STRING, allowNull: false },
   	email    : { type: DataTypes.STRING, allowNull: false, unique: true },
  });

  Contact.prototype.toWeb = function (pw) {
  	let json = this.toJSON();
  	return json;
  }

  return Contact;
};