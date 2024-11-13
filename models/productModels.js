const pool = require('../services/db');


const getAllProducts = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM products');
        return results;
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products', message: err.message });
    }
};

const getProductsById = async (id) => {
    try {
        let query = "SELECT * FROM products WHERE product_id = ?";
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getAllProducts,
    getProductsById,
};