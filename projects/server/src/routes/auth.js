const { auth: authController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.post(
  "/register",
  authValidator.validateRegister,
  authController.register
);

module.exports = router;
