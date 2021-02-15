'use strict';

const faker = require('faker');
faker.locale = "id_ID";

const todoitems = [...Array(9)].map((user) => {
  return {
    todo_id: faker.random.number({
      'min': 1,
      'max': 9
    }),
    description: faker.random.words(),
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
   await queryInterface.bulkInsert("todoitems", todoitems);
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
