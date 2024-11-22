const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//GET PRODUCT BY ID
router.get('/:id', productController.getProductsById);

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

//POST PRODUCT
router.post('/add-product', productController.addProduct);

//MODIFY PRODUCT
router.post('/update-product/:id', productController.modifyProduct);

//DELETE PRODUCT
router.delete('/del-product/:id', productController.deleteProduct);

module.exports = router;