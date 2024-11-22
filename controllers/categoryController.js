const categoryModels = require('../models/categoryModels');

exports.getAllCategory = async (req, res) => {
    try {
        const result = await categoryModels.getCategoryList();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: 'Error fetching', message: err.message });
    }
}

exports.addNewCategory = async (req, res) => {
    const { category_nane } = req.body;
    try {
        await categoryModels.createCategory(category_nane);
        res.status(201).json({ message: 'Category added'});
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}