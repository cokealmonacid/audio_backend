'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transformers',[
      { 
        id          : 1,
        name_s_e    : 'VALDIVIA',
        designation : 'T2',
        brand       : 'J. Schneider',
        trans_rel   : '230/69/13,8',
        year       : 1989,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      }, 
      {
        id          : 2,
        name_s_e    : 'VALDIVIA',
        designation : 'T2',
        brand       : 'EFACEC',
        trans_rel   : '69/24/13,8',
        year       : 1996,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },  
      {
        id          : 3,
        name_s_e    : 'VALDIVIA',
        designation : 'T3',
        brand       : 'RHONA',
        trans_rel   : '69/24/13,8',
        year       : 2006,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },  
      {
        id          : 4,
        name_s_e    : 'VALDIVIA',
        designation : 'T4',
        brand       : 'J. Schneider',
        trans_rel   : '230/69/13,8',
        year       : 1989,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },  
      {
        id          : 5,
        name_s_e    : 'PICARTE',
        designation : 'T1',
        brand       : 'EFACEC',
        trans_rel   : '69/24/13,8',
        year       : 1996,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },  
      {
        id          : 6,
        name_s_e    : 'PICARTE',
        designation : 'T2',
        brand       : 'EFACEC',
        trans_rel   : '69/24/13,8',
        year       : 1996,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },  
      {
        id          : 7,
        name_s_e    : 'PICARTE',
        designation : 'TR',
        brand       : 'TUSAN',
        trans_rel   : '69/24/13,8',
        year       : 2009,
        createdAt   : '2018-04-15 15:19:06',
        updatedAt   : '2018-04-15 15:19:06'
      },   
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transformers', null, {});
  }
};
