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
        let query = "DELETE FROM products WHERE product_id = ?";
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

const modifyProduct = (id, product, callback) => {
    const updates = [];
    const values = [];

    Object.entries(product).forEach(([key, value]) => {
        if (value !== null) {
            updates.push(`${key} = ?`);
            values.push(value);
        }
    });

    if (updates.length === 0) {
        return callback(null, { message: 'No fields to update' });
    }

    values.push(id);

    const query = `UPDATE products SET ${updates.join(', ')} WHERE product_id = ?`;

    pool.execute(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id, ...product });
    });
};

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    deleteProduct,
    modifyProduct,
};