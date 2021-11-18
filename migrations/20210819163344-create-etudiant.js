'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('etudiants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type :DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type :DataTypes.STRING,
        allowNull: false
      },
      cne: {
        type :DataTypes.STRING,
        allowNull: false,
        unique : true
      },
      password: {
        type :DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('etudiants');
  }
};
