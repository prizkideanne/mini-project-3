const db = require("../../models");

const createOrderDetail = async (req, res) => {
  const userId = req.user.id;
  const { total, address } = req.body;

  try {
    const newOrderDetail = await db.Order_Detail.create({
      userId: userId,
      total: Number(total),
      address: address,
    });
    res.status(201).send({
      message: "success create Order Detail",
      data: newOrderDetail,
    });
  } catch (errors) {
    res.status(500).send({
      message: "fatal error on server",
      errors,
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
