const db = require("../../models");
const { setFromFileNameToDBValue } = require("../utils/file");

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
      productId,
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

const editProduct = async (req, res) => {
  const productId = req.products.id;
  const { name, price, description, categoryId } = req.body;

  try {
    const productData = await db.product.findOne({ where: { id: prodeuctId } });
    if (price) {
      productData.price = price;
    }
    if (description) {
      productData.description = description;
    }
    if (name) {
      productData.name = name;
    }
    if (categoryId) {
      productData.categoryId = categoryId;
    }
    if (productId) {
      productData.productId = productId;
    }
    await productData.save();

    res.send({
      message: "success update Product",
      data: productData,
    });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      errors: error,
    });
  }
};

module.exports = {
  createProduct,
  editProduct,
};
