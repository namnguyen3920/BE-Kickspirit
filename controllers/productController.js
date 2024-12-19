const productModels = require('../models/productModels');
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single("img");

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
        cloudinary.uploader.upload_stream(
            { folder: "kickspirit" },
            async (error, result) => {
                if (error) return res.status(500).json({ error: "Error: " });
                const newProduct = {name, description, price, stock, category_id, img: result.secure_url}
                await productModels.createProduct(newProduct);
                res.status(201).json({ message: 'Product added', product: newProduct });
    }).end(req.file.buffer);
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