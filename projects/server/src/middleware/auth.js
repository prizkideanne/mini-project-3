const { body } = require("express-validator");

// const validate = (validations) => {
//     return async (req, res, next) => {
//       for (let validation of validations) {
//         const result = await validation.run(req);
//         if (result.errors.length) break;
//       }
  
//       const errors = validationResult(req);
//       if (errors.isEmpty()) {
//         return next();
//       }
  
//       res.status(400).json({ errors: errors.array() });
//     };
//   };

  module.exports = {
    validateRegister: () => { return [
        body("username")
          .notEmpty()
          .withMessage("username is required")
          .isLength({ 
            min:8,
            max: 50 })
          .withMessage("Minimum character is 4 and maximum 10"),
        body("email").isEmail(),
        body("phoneNumber").notEmpty(),
        body("storeName").notEmpty(),
        body("password")
          .isLength({ min: 8 })
          .withMessage("minimum password length is 8 characters")
          .isStrongPassword({
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
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
      ]}
  }