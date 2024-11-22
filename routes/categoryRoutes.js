const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

//GET ALL CATEGORY
router.get('/', categoryController.getAllCategory);

//POST PRODUCT
router.post('/add-category', categoryController.addNewCategory);

module.exports = router;