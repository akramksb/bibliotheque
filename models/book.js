'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.etudiant, {through: 'BookEtduiant'})
      book.belongsToMany(models.category, {through: 'BookCategory'})
    }
  };
  book.init({
    isbn: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    },
    title: {
      type : DataTypes.STRING,
      allowNull : false
    },
    image: DataTypes.STRING,
    qteStock: {
      type :DataTypes.INTEGER,
      allowNull : false
    },
    total: {
      type :DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};