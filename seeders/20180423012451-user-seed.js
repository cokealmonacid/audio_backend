'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      { 
        email       : 'jorgealmonacid24@gmail.com',
        password    : '$2a$10$CYS3MmYhom0SBEhXMJHXsexeytChE1EsOeIDVRw2TxkwGjEw55ma.',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
