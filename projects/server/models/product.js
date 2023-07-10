"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      Product.hasMany(models.Cart, { foreignKey: "productId" });
      Product.hasMany(models.Order_Product, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      userId: DataTypes.SMALLINT,
      categoryId: DataTypes.SMALLINT,
      name: DataTypes.STRING,
      price: DataTypes.BIGINT,
      imageUrl: DataTypes.STRING,
      description: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
