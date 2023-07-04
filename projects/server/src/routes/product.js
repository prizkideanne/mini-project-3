const {
  createProduct,
  editProduct,
  getAllProduct,
} = require("../controllers/product");
const router = require("express").Router();
const multerUpload = require("../middleware/multer");

router.post("/createProduct", multerUpload.single("file"), createProduct);
router.patch("/editProduct/:id", multerUpload.single("file"), editProduct);
router.get("/getAllProduct", getAllProduct);

module.exports = router;
