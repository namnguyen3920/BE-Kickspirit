const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//GET PRODUCT BY ID
router.get('/:id', productController.getProductsById);

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

//POST PRODUCT
router.post('/add-product', productController.addProduct);

//DELETE PRODUCT
router.delete('/:id', productController.deleteProduct);

module.exports = router;