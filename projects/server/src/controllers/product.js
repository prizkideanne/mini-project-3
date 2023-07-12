const db = require("../../models");
const {
  setFromFileNameToDBValue,
  getFilenameFromDbValue,
  getAbsolutePathPublicFile,
} = require("../utils/file");
const fs = require("fs");

const createProduct = async (req, res) => {
  const userId = req.user.id;
  const { name, price, description, category } = req.body;

  const imageUrl = setFromFileNameToDBValue(req.file?.filename);
  try {
    const newProduct = await db.Product.create({
      name: name,
      price: price,
      description: description,
      categoryId: Number(category),
      imageUrl: imageUrl,
      userId: userId,
    });
    res.status(201).send({
      message: "success create Product",
      data: newProduct,
    });
  } catch (errors) {
    console.log(errors);
    res.status(500).send({
      message: "fatal error on server",
      errors,
    });
  }
};

const getAllProduct = async (req, res) => {
  const pagination = {
    page: Number(req.query.page) || 1,
    perPage: Number(req.query.perPage) || 9,
    search: req.query.search || "",
  };
  try {
    const where = { isActive: true };
    if (pagination.search) {
      where.name = {
        [db.Sequelize.Op.like]: `%${pagination.search}%`,
      };
    }

    // const order = [];
    // for (const sort in pagination.sortBy) {
    //   order.push([sort, pagination.sortBy[sort]]);
    // }

    const results = await db.Product.findAll({
      include: [
        { model: db.User, attributes: ["username", "storeName"], as: "User" },
        { model: db.Category, attributes: ["name"], as: "Category" },
      ],
      where,
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
    });

    const countData = await db.Product.count({ where });
    pagination.totalData = countData;
    const totalPage = Math.ceil(pagination.totalData / pagination.perPage);
    pagination.totalPage = totalPage;

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

const getMyProduct = async (req, res) => {
  const userId = req.user.id;
  const pagination = {
    page: Number(req.query.page) || 1,
    perPage: Number(req.query.perPage) || 9,
    search: req.query.search || "",
    sortBy: req.query.sortBy,
  };
  try {
    const where = { userId };
    if (pagination.search) {
      where.name = {
        [db.Sequelize.Op.like]: `%${pagination.search}%`,
      };
    }

    const order = []; // generate order/sorting
    for (const sort in pagination.sortBy) {
      order.push([sort, pagination.sortBy[sort]]);
    }

    const results = await db.Product.findAll({
      where,
      limit: pagination.perPage,
      offset: (pagination.page - 1) * pagination.perPage,
      sort: pagination.sortBy,
    });

    const countData = await db.Product.count({ where });
    pagination.totalData = countData;

    const totalPage = Math.ceil(pagination.totalData / pagination.perPage);
    pagination.totalPage = totalPage;

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

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await db.Product.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: db.User,
          attributes: ["username"],
        },
      ],
    });
    res.send({
      message: "success get product from profile",
      data: results,
    });
  } catch (errors) {
    res.status(500).send({
      message: "fatal error on server",
      errors,
    });
  }
};

const editProduct = async (req, res) => {
  const id = Number(req.params.id);

  const userId = req.user.id;
  console.log(id);
  const { name, description, category, price } = req.body;
  try {
    const getProduct = await db.Product.findOne({
      where: {
        id: id,
        userId: userId,
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
    if (name) {
      getProduct.name = name;
    }
    if (description) {
      getProduct.description = description;
    }
    if (category) {
      getProduct.categoryId = Number(category);
    }
    if (req.file) {
      getProduct.imageUrl = setFromFileNameToDBValue(req.file.filename);
    }
    await getProduct.save();
    res.send({ message: "success update product", data: getProduct });
  } catch (errors) {
    console.log(errors);
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
  getMyProduct,
  getProductById,
};
