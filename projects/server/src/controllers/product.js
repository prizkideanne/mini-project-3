const db = require("../../models");
const {
  setFromFileNameToDBValue,
  getFilenameFromDbValue,
  getAbsolutePathPublicFile,
} = require("../utils/file");

const createProduct = async (req, res) => {
  const { name, price, description, categoryId } = req.body;

  const imageUrl = setFromFileNameToDBValue(req.file.filename);
  try {
    const newProduct = await db.Product.create({
      name,
      price,
      description,
      categoryId,
      imageUrl,
    });
    res.status(201).send({
      message: "success create Product",
      data: newProduct,
    });
  } catch (errors) {
    res.status(500).send({
      message: "fatal error on server",
      errors,
    });
  }
};

const getAllProduct = async (req, res) => {
  // const userId = req.user.id;
  const pagination = {
    page: Number(req.query.page) || 1,
    perPage: Number(req.query.perPage) || 9,
    search: req.query.search || undefined,
  };
  try {
    // const where = { userId };
    if (pagination.search) {
      where.content = {
        [db.Sequelize.Op.like]: `%${pagination.search}%`,
      };
    }
    const results = await db.Product.findAll({
      // where,
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
    });

    const countData = await db.Product.count();
    pagination.totalData = countData;
    res.send({
      message: "success get Product",
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

const editProduct = async (req, res) => {
  const id = Number(req.params.id);
  // const userId = req.user.id;
  const { price } = req.body;
  try {
    const getProduct = await db.Product.findOne({
      where: {
        id,
        // userId,
      },
    });
    if (!getProduct) {
      return res.status(400).send({
        message: "product is not found",
      });
    }
    if (price) {
      getProduct.price = Number(price);
    }
    if (req.file) {
      const realimageURL = getProduct.getDataValue("imageURL");
      const oldFilename = getFilenameFromDbValue(realimageURL);
      if (oldFilename) {
        fs.unlinkSync(getAbsolutePathPublicFile(oldFilename));
      }
      getProduct.imageURL = setFromFileNameToDBValue(req.file.filename);
    }
    await getProduct.save();
    res.send({ message: "success update product", data: getProduct });
  } catch (errors) {
    res.status(500).send({
      message: "fatal error on server",
      errors,
    });
  }
};

module.exports = {
  createProduct,
  editProduct,
  getAllProduct,
};
