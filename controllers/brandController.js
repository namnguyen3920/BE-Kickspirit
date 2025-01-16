const brandModels = require('../models/brandModels');

exports.getAllBrand = async (req, res) => {
    try {
        const result = await brandModels.getBrandList();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching', message: err.message });
    }
}
