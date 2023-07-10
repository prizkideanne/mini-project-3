const {
  grossIncome,
  dailyTransaction,
  topSelling,
} = require("../controllers/orderProduct");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");

router.get("/grossIncome", verifyToken, grossIncome);
router.get("/dailyTransaction", verifyToken, dailyTransaction);
router.get("/topSelling", verifyToken, topSelling);

module.exports = router;
