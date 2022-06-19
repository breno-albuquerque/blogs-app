'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTabel('Categories', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncremente: true,
          allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};