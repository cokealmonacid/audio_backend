'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Codes', [
      {
        description : 'code_1',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 1
      },
      {
        description : 'code_2',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 1
      },
      {
        description : 'code_21',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 2
      },
      {
        description : 'code_22',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('codes', null, {});
  }
};
