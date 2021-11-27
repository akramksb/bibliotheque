'use strict';
const {
  Model
} = require('sequelize');

const etudiant = require("./etudiant");
const book = require("./book");

// const { etudiant, book } = require(".");


module.exports = function(sequelize, DataTypes) {
  return  sequelize.define("bookEtudiant",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: book, 
        key: 'isbn'
      }
    },
    etudiantId: {
      type: DataTypes.INTEGER,
      references: {
        model: etudiant,
        key: 'cne'
      }
    },
    date: {
      type : DataTypes.DATE,
      allowNull : false
    },
    delai: {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  });
}

// module.exports = (sequelize, DataTypes) => {
//   class bookEtudiant extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   bookEtudiant.init({

//     bookId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: book, 
//         key: 'isbn'
//       }
//     },
//     etudiantId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: etudiant,
//         key: 'cne'
//       }
//     },

//     date: {
//       type : DataTypes.DATE,
//       allowNull : false
//     },
//     delai: {
//       type : DataTypes.INTEGER,
//       allowNull : false
//     }
//   }, {
//     sequelize,
//     modelName: 'bookEtudiant',
//   });
//   return bookEtudiant;
// };