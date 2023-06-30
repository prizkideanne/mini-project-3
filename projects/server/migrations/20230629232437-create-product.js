'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT,
      },
      userId: {
        type: Sequelize.SMALLINT,
        references: {
          model: "Users",
          key: "id",
        },
      },
      categoryId: {
        type: Sequelize.SMALLINT,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(255),
      },
      description: {
        type: Sequelize.TEXT("long"),
        allowNull:false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};