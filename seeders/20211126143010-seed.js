'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     var admin = []
     
      admin.push({
        id : 0,
        name: "admin",
        username : "admin",
        lastname : "admin",
        password: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      var student = []
     
      student.push({
        id : 0,
        name: "student",
        lastname : "student",
        cne : "student",
        password: "student",
        createdAt: new Date(),
        updatedAt: new Date()
      });

      var books = []
     
      books.push({
        id : 0,
        isbn: "123",
        title : "learn python",
        image : "123.jpg",
        qteStock : 3,
        total: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      books.push({
        id : 0,
        isbn: "345",
        title : "Programming with python",
        image : "345.jpg",
        qteStock : 10,
        total: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      books.push({
        id : 0,
        isbn: "8888",
        title : "learn C#",
        image : "8888.jpg",
        qteStock : 7,
        total: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      });

     await queryInterface.bulkInsert('admins', admin, {});
     await queryInterface.bulkInsert('etudiants', student, {});
     await queryInterface.bulkInsert('books', books, {});

  
     console.log('Done');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
