"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.hasMany(models.Product, {foreignKey: "productId"})
    }
  }
  Cart.init(
    {
      userId: DataTypes.SMALLINT,
      productId: DataTypes.SMALLINT,
      quantity: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
