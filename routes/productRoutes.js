const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const sellingController = require('../controllers/sellingController');
const buyingController = require('../controllers/buyingController');
const upload = require("../services/multerConfig");

//GET PRODUCT BY ID
router.get('/:id', productController.getProductsById);

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

//POST PRODUCT
router.post('/add-product', upload.single("img"), productController.addProduct);

//MODIFY PRODUCT
router.post('/update-product/:id', productController.modifyProduct);

//DELETE PRODUCT
router.delete('/del-product/:id', productController.deleteProduct);

//PRODUCT SELLING
router.get('/selling/:id', sellingController.getSellingProductsById);

//PRODUCT BUYING
router.post('/buying', buyingController.addBuyingProduct);

//PRODUCT ORDER
router.get('/order/:id', buyingController.getBuyingProductById);

module.exports = router;