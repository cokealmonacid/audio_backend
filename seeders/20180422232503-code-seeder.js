'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Codes', [
      {
        description : '94418',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 1
      },
      {
        description : 'C-13288',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 2
      },
      {
        description : '33280',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 3
      },
      {
        description : '94419',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 4
      },
      {
        description : 'C- 13286',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 5
      },
      {
        description : 'C- 13287',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 6
      },
      {
        description : '7320118',
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06',
        transformerId: 7
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('codes', null, {});
  }
};
