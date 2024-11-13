const productModels = require('../models/productModels');

exports.getAllProducts = async (req, res) => {
    try {
        // const [results] = await pool.execute('SELECT * FROM products');
        const products = await productModels.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products', message: err.message });
    }
}

exports.getProductsById = async (req, res) => {
    try {        
        
        const products = await productModels.getProductsById(req.params.id);        
        console.log("It got the products!", products);
        res.status(200).json(products);
    } 
    catch (err) {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

    }
}