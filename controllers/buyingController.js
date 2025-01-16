const buyingModels = require('../models/buyingModels');

exports.addBuyingProduct = async (req, res) => {
    const { selling_id, user_id, shipping_address, total } = req.body;
    try {
        await buyingModels.createBuyingProduct({selling_id, user_id, shipping_address, total});
        res.status(201).json({ message: 'Order Confirmed!'});
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getBuyingProductById = async (req, res) => {
    try {
        const response = await buyingModels.getBuyingProductById(req.params.id);
        res.status(200).json(response);
    }
    catch (err) {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

    }
}