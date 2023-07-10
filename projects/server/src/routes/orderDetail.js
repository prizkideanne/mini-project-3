const router = require("express").Router();
const {
  createOrderDetail,
  getAllOrderDetail,
  getOrderDetailByUser,
} = require("../controllers/orderDetail");
const { verifyToken } = require("../middleware/auth");
const multerUpload = require("../middleware/multer");

router.post(
  "/createOrderDetail",
  verifyToken,
  multerUpload.single("file"),
  createOrderDetail
);

router.get("/getAllOrderDetail", getAllOrderDetail);
router.get("/getOrderDetailByUser/:id", verifyToken, getOrderDetailByUser);

module.exports = router;
