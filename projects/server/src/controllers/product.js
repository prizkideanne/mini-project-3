const db = require("../../models");
const {
  setFromFileNameToDBValue,
  getFilenameFromDbValue,
  getAbsolutePathPublicFile,
} = require("../utils/file");

const createProduct = async (req, res) => {
  const { name, price, description, categoryId, userId } = req.body;

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

module.exports = {
  createProduct,
};
