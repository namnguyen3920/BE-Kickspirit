const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// CREATE PRODUCT
router.post("/add-product", async (req, res, next) => {
  const { name, description, img, category_id, price, stock } = req.body;
  const imgValue = img ? img : null;

  let query = "INSERT INTO products (name, description, img, category_id, price, stock) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const [results] = await db.execute(query, [name, description, imgValue, category_id, price, stock]);
    res.status(200).json({ id: results.insertId, name, description, imgValue, category_id, price, stock });
  } catch (err) {
    return next(createError(500, 'Failed to create product', { original: err }));
  }
});

//GET PRODUCT BY ID
router.get('/:id', productController.getProductsById);

//GET ALL PRODUCTS
router.get('/', productController.getAllProducts);

module.exports = router;