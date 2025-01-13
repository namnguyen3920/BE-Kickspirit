const sellingModels = require('../models/sellingModels');

exports.getSellingProductsById = async (req, res) => {
    try {
        const product = await sellingModels.getSellingProductsById(req.params.id);
        res.status(200).json(product);
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