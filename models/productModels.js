const pool = require('../services/db');
const DEFAULT_IMGURL = "https://res.cloudinary.com/dfowalm4d/image/upload/v1736586041/cld-sample-5.jpg";

const getAllProducts = async (req, res) => {
    try {
        let query = `SELECT products.*, category.category_name, brands.brand_name
        FROM products 
        LEFT JOIN category ON products.category_id = category.category_id
        LEFT JOIN brands ON products.brand_id = brands.brand_id;`
        const [results] = await pool.execute(query);
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

const createProduct = async (data) => {
    const {product_name, description, category_id, brand_id, retail_price, img} = data;
    try {
        const imgValue = img ? img : DEFAULT_IMGURL;
        let query = "INSERT INTO products (product_name, description, category_id, brand_id, retail_price, img) VALUES (?, ?, ?, ?, ?, ?)";
        const [results] = await pool.execute(query, [product_name, description, category_id, brand_id, retail_price, imgValue]);
        return {id: results.insertId, product_name, description, category_id, brand_id, retail_price, imgValue};
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