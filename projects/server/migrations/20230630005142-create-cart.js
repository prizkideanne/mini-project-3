'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT
      },
      userId: {
        type: Sequelize.SMALLINT,
        references: {
          model: "Users",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.SMALLINT,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.SMALLINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};