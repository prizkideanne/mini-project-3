"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Product.belongsTo(models.Order_Detail, { foreignKey: "orderId" });
      Order_Product.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Order_Product.init(
    {
      orderId: DataTypes.SMALLINT,
      productId: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: "Order_Product",
    }
  );
  return Order_Product;
};
