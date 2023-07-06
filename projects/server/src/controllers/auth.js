require("dotenv").config();
const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = db;
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async register(req, res) {
    const { username, email, phoneNumber, storeName, password } = req.body;
    try {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        res.status(400).send({ message: "Username already taken" });
        return;
      }

      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        res.status(400).send({ message: "Email already taken" });
        return;
      }

      const existingPhoneNumber = await User.findOne({
        where: { phoneNumber },
      });
      if (existingPhoneNumber) {
        res.status(400).send({ message: "Phone number already taken" });
        return;
      }

      const existingStoreName = await User.findOne({
        where: { storeName },
      });
      if (existingStoreName) {
        res.status(400).send({ message: "Store name already taken" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        phoneNumber,
        storeName,
        password: hashedPassword,
      });

      res.status(201).send({
        message: "registration success",
        data: {
          username: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          storeName: newUser.storeName,
        },
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "something wrong in the server", errors: error });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ where: { username } });
      const isValid = await bcrypt.compare(password, user.password);
      if (user && isValid) {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "1hr",
        });
        res.send({
          message: "login success",
          data: user,
          accessToken: token,
        });
        return;
      } else {
        res.status(400).send({
          message: "login failed, incorect username or password",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error on server",
        error,
      });
    }
  },
};
