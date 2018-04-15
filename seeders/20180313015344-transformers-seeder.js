'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transformers',[
      {
        brand : 'brand_1',
        model : 'model_1',
        year  : 1991,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },
      {
        brand : 'brand_2',
        model : 'model_2',
        year  : 1992,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },
      {
        brand : 'brand_3',
        model : 'model_3',
        year  : 1993,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },
      {
        brand : 'brand_4',
        model : 'model_4',
        year  : 1994,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },
      {
        brand : 'brand_5',
        model : 'model_5',
        year  : 1995,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },
      {
        brand : 'brand_6',
        model : 'model_6',
        year  : 1996,
        createdAt : '2018-04-15 15:19:06',
        updatedAt : '2018-04-15 15:19:06'
      },   
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transformers', null, {});
  }
};
