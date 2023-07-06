const {
  createProduct,
  editProduct,
  getAllProduct,
  getMyProduct,
} = require("../controllers/product");
const router = require("express").Router();
const multerUpload = require("../middleware/multer");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/createProduct",
  verifyToken,
  multerUpload.single("file"),
  createProduct
);
router.patch(
  "/editProduct/:id",
  verifyToken,
  multerUpload.single("file"),
  editProduct
);
router.get("/getAllProduct", getAllProduct);
router.get("/getMyProduct/:id", verifyToken, getMyProduct);

module.exports = router;
