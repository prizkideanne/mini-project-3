const { createProduct } = require("../controllers/product");
const router = require("express").Router();
const multerUpload = require("../middleware/multer");

router.post("/createProduct", multerUpload.single("file"), createProduct);

module.exports = router;
