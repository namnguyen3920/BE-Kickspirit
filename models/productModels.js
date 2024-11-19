const pool = require('../services/db');
const DEFAULT_IMGURL = "https://res.cloudinary.com/dh75dmdfs/image/upload/v1731598559/f5506bd3c8026a2d9c8e07cfadd4b226_xtxnvr.jpg";

const getAllProducts = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM products');
        return results;
    } catch (err) {
        throw err;
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

const createProduct = async (name, description, price, stock, category_id, img) => {
    try {
        const imgValue = img ? img : DEFAULT_IMGURL;
        let query = "INSERT INTO products (name, description, price, stock, category_id, img) VALUES (?, ?, ?, ?, ?, ?)";
        const [results] = await pool.execute(query, [name, description, price, stock, category_id, imgValue]);
        return {id: results.insertId, name, description, price, stock, category_id, imgValue};
    }
    catch (err) {
        throw err;
    }
}

const deleteProduct = async (id) => {
    try {
        let query  = "DELETE FROM products WHERE id = ?";
        const [results] = await pool.execute(query, [id]);
        console.log(results.affectedRows);
        return results.affectedRows > 0;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    deleteProduct,
};