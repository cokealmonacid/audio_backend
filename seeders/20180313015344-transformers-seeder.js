'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transformers',[
      {
        brand : 'brand_1',
        model : 'model_1',
        year  : 1991
      },
      {
        brand : 'brand_2',
        model : 'model_2',
        year  : 1992
      },
      {
        brand : 'brand_3',
        model : 'model_3',
        year  : 1993
      },
      {
        brand : 'brand_4',
        model : 'model_4',
        year  : 1994
      },
      {
        brand : 'brand_5',
        model : 'model_5',
        year  : 1995
      },
      {
        brand : 'brand_6',
        model : 'model_6',
        year  : 1996
      },   
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transformers', null, {});
  }
};
