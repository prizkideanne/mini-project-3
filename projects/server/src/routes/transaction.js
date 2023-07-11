const { transaction: transactionController } = require("../controllers");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, transactionController.addToCart);

router.get("/getCart", verifyToken, transactionController.getMyCart);

router.delete("/deleteCart/:id", verifyToken, transactionController.deleteMyCart);

module.exports = router;
