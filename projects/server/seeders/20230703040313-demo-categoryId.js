"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Olahraga",
      },
      {
        id: 2,
        name: "Fiksi",
      },
      {
        id: 3,
        name: "Musik",
      },
      {
        id: 4,
        name: "Ekonomi",
      },
      {
        id: 5,
        name: "Politik",
      },
      {
        id: 6,
        name: "Agama",
      },
      {
        id: 7,
        name: "Filsafat",
      },
      {
        id: 8,
        name: "Psikologi",
      },
      {
        id: 9,
        name: "Arsitektur",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
