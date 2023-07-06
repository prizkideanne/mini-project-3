const { createCategory, getAllCategories, updateCategory } = require("../controllers/category");

const router = require ("express").Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategories", getAllCategories);
router.patch("/updateCategory/:id", updateCategory);

module.exports = router;