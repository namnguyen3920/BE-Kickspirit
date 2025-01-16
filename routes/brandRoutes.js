const router = require("express").Router();
const brandController = require("../controllers/brandController");

//GET ALL CATEGORY
router.get('/', brandController.getAllBrand);

module.exports = router;