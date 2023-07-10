const db = require("../../models");

module.exports = {
  async addToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
      const product = await db.Product.findOne({ id: productId });

      if (!product) {
        res.status(404).send({ message: "product not found" });
        return;
      }

      const isExist = await db.Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });

      if (isExist) {
        // const updateExisting = await db.Cart.update(
        //   { quantity: quantity + 1 },
        //   { where: { userId: userId, productId: productId } }
        // );
        isExist.quantity = quantity;
        await isExist.save();
        return res.status(201).send({
          message: "updated to cart",
          data: isExist,
        });
      }

      const result = await db.Cart.create({
        userId: userId,
        productId: productId,
        quantity: Number(quantity),
      });

      res.status(201).json({
        message: "added to cart",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  },

  async getMyCart(req, res) {
    const userId = req.user.id;

    try {
      const result = await db.Cart.findAll({
        where: { userId: userId },
        include: [Product],
      });

      if (cart) {
        res.status(200).send({
          message: "success",
          data: result,
        });
      } else {
        res.send({
          message: "you dont have any",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "somethong wrong on server" });
    }
  },
};
