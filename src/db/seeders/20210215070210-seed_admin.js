'use strict';

const faker = require('faker');
faker.locale = "id_ID";
const bcrypt = require("bcrypt");
const yourpassword = 'admin123';
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
      await queryInterface.bulkInsert('users', [{
        username: 'admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync(yourpassword, 10),
        role: 'admin',
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent()
      }]
      )
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
