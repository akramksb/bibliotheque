'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isbn: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      title: {
        type: Sequelize.STRING,
        allowNull : false
      },
      image: {
        type: Sequelize.STRING
      },
      qteStock: {
        type :Sequelize.INTEGER,
        allowNull : false
      },
      total: {
        type :Sequelize.INTEGER,
        allowNull : false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};