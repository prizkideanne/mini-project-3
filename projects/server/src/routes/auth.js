const { auth: authController } = require("../controllers");
const authValidator = require("../middleware/auth");
const router = require("express").Router();

router.post(
  "/register",
  authValidator.validateRegister,
  authController.register
);

router.post("/login", authController.login);

// router.get("/", authController.keepLogin);

module.exports = router;
