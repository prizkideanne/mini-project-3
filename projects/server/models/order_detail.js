"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Detail.belongsTo(models.User, { foreignKey: "userId" });
      Order_Detail.hasMany(models.Order_Product, { foreignKey: "orderId" });
    }
  }
  Order_Detail.init(
    {
      userId: DataTypes.SMALLINT,
      total: DataTypes.BIGINT,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order_Detail",
    }
  );
  return Order_Detail;
};
