const db = require("../../models");
const { Op } = require("sequelize");

const grossIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    console.log(startOfDay);
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const results = await db.Order_Product.findAll({
      include: [
        {
          model: db.Product,
          where: { userId },
        },
        {
          model: db.Order_Detail,
          where: {
            createdAt: {
              [Op.between]: [startOfDay, endOfDay],
            },
          },
        },
      ],
    });

    let grossIncome = 0;
    for (const result of results) {
      grossIncome += result.Product.price;
    }

    res.status(200).send({
      message: "success",
      data: {
        grossIncome: grossIncome,
        results,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "something wrong on server" });
  }
};

const dailyTransaction = async (req, res) => {
  const userId = req.user.id;

  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const results = await db.Order_Detail.findAll({
      include: [
        {
          model: db.Order_Product,
          include: [
            {
              model: db.Product,
              where: { userId },
            },
          ],
        },
      ],
      where: {
        createdAt: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    const totalTransactions = results.length;

    res.status(200).send({
      message: "success",
      data: {
        totalTransactions: totalTransactions,
        results,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "something wrong on server" });
  }
};

// const topSelling = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const results = await db.Order_Product.findAll({
//       include: [
//         {
//           model: db.Product,
//           where: { userId },
//         },
//       ],
//       attributes: [{ exclude: "productId" }],
//       order: [[db.sequelize.literal("totalQuantity"), "DESC"]],
//       limit: 5,
//     });

//     const topSellingProducts = results.map((result) => ({
//       productId: result.productId,
//       totalQuantity: result.dataValues.totalQuantity,
//     }));

//     res.status(200).send({
//       message: "success",
//       data: {
//         topSellingProducts: topSellingProducts,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "something wrong on server" });
//   }
// };
module.exports = {
  grossIncome,
  dailyTransaction,
  // topSelling,
};
