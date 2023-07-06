const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = {
  validateRegister: validate([
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isLength({
        min: 4,
        max: 10,
      })
      .withMessage("Minimum character is 4 and maximum 10"),
    body("email").isEmail().notEmpty(),
    body("phoneNumber").notEmpty(),
    body("storeName").notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("minimum password length is 8 characters")
      .isStrongPassword({
        minSymbols: 0,
      })
      .withMessage(
        "password must contain at least 1 uppercase, 1 lowercase and 1 numbers"
      )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          return false;
        }
        return true;
      })
      .withMessage("confirm password is not match with password"),
  ]),

  async verifyToken(req, res, next) {
    // check token valid or not
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({
        message: "token is not found",
      });
      return;
    }

    const [format, token] = authorization.split(" ");
    if (format.toLocaleLowerCase() === "bearer") {
      try {
        const payload = jwt.verify(token, secretKey);
        if (!payload) {
          res.status(401).send({
            message: "token verification failed",
          });
          return;
        }
        req.user = payload;
        next();
      } catch (error) {
        res.status(401).send({
          message: "invalid token",
          error,
        });
      }
    }
  },
};
