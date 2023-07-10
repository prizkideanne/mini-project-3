const db = require("../../models");

const createOrderDetail = async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;

  try {
    const carts = await db.Cart.findAll({
      where: { userId: userId },
      include: [{ model: db.Product, attributes: { exclude: "productId" } }],
    });

    if (!carts) {
      return res.status(404).send({ message: "Cart not found" });
    }

    let total = 0;
    for (const cart of carts) {
      total += cart.Product.price * cart.quantity;
    }

    const newOrderDetail = await db.Order_Detail.create({
      userId: userId,
      total: Number(total),
      address: address,
    });

    for (const cart of carts) {
      for (let i = 1; i <= cart.quantity; i++) {
        await db.Order_Product.create({
          orderId: newOrderDetail.id,
          productId: cart.productId,
        });
      }
    }

    await db.Cart.destroy({
      where: {
        userId: userId,
      },
    });

    res.status(201).send({
      message: "Success create Order Detail",
      data: {
        orderDetail: newOrderDetail,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Fatal error on server",
      error,
    });
  }
};

const getAllOrderDetail = async (req, res) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    perPage: Number(req.query.perPage) || 9,
    search: req.query.search || undefined,
  };
  try {
    if (pagination.search) {
      where.content = {
        [db.Sequelize.Op.like]: `%${pagination.search}%`,
      };
    }

    const results = await db.Order_Detail.findAll({
      include: [
        { model: db.User, attributes: ["id"] },
        {
          model: db.Order_Product,
          attributes: ["orderId"],
        },
      ],
      // where,
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
      raw: true,
    });

    const countData = await db.Order_Detail.count();
    pagination.totalData = countData;
    res.send({
      message: "success get Order Detail",
      pagination,
      data: results,
    });
  } catch (errors) {
    res.status(500).send({
      message: "fatal error on server",
      errors: errors.message,
    });
  }
};

const getOrderDetailByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await db.Order_Detail.findAll({
      include: [
        {
          model: db.User,
          where: { id },
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    res.send({
      message: "success get Order Detail by User",
      data: results,
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).send({
      message: "fatal error on server",
      errors,
    });
  }
};

module.exports = {
  createOrderDetail,
  getAllOrderDetail,
  getOrderDetailByUser,
};
