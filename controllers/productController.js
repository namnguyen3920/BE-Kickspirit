const productModels = require('../models/productModels');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModels.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products', message: err.message });
    }
}

exports.getProductsById = async (req, res) => {
    try {
        const products = await productModels.getProductsById(req.params.id);
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

exports.addProduct = async (req, res) => {
    const { name, description, price, stock, category_id, img } = req.body;
    try {
        const newProduct = await productModels.createProduct(name, description, price, stock, category_id, img);
        res.status(201).json({ message: 'Product created', product: newProduct });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteProduct = async (req, res) => {   
    try {
        const result = await productModels.deleteProduct(req.params.id);                 
        if (!result) {
            res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    }
    catch (err) {
        res.status(400).json({ message: "Cannot delete product", error: err.message });
    }
}

exports.modifyProduct = async (req, res) => {
    const product = req.body;
    const id = req.params.id;
    try {        
        const result = await productModels.modifyProduct(id, product);
        res.status(200).json({ message: "Product updated" , product: result});
    } catch (err){
        res.status(400).json({ message: err.message });
    }
}