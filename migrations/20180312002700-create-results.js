'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rms_total: {
        type: Sequelize.FLOAT
      },
      peak: {
        type: Sequelize.FLOAT
      },
      crest: {
        type: Sequelize.FLOAT
      },
      frequency_1: {
        type: Sequelize.FLOAT
      },
      frequency_2: {
        type: Sequelize.FLOAT
      },
      Failure: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Results');
  }
};