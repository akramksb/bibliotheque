'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etudiant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  etudiant.init({
    username: {
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
    }
  }, {
    sequelize,
    modelName: 'etudiant',
  });
  return etudiant;
};