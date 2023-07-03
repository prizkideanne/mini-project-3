const { createProduct, editProduct } = require("../controllers/product");
const router = require("express").Router();
const multerUpload = require("../middleware/multer");

router.post("/createProduct", multerUpload.single("file"), createProduct);
router.patch("/editProduct", multerUpload.single("file"), editProduct);

module.exports = router;
