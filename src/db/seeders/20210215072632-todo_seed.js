'use strict';

const faker = require('faker');
faker.locale = "id_ID";

const todos = [...Array(9)].map((user) => {
  return {
    user_id: faker.random.number({
      'min': 1,
      'max': 9
    }),
    title: faker.lorem.word(),
    description: faker.lorem.words(),
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
   await queryInterface.bulkInsert("todos", todos);
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
