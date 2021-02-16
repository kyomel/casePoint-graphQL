'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');
faker.locale = "id_ID";
const yourPassword = faker.internet.password();

const users = [...Array(8)].map((user) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(yourPassword, 10),
    role: 'user',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  }
});

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
      await queryInterface.bulkInsert("users", users);
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
