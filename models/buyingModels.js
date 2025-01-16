const pool = require('../services/db');

const createBuyingProduct = async (data) => {
    const {selling_id, user_id, shipping_address, total} = data;
    try {
        let query = "INSERT INTO buying (selling_id, user_id, shipping_address, total) VALUES (?, ?, ?, ?)";
        const [results] = await pool.execute(query, [selling_id, user_id, shipping_address, total]);
        return {id: results.insertId, selling_id, user_id, shipping_address, total};
    }
    catch (err) {
        throw err;
    }
}

const getBuyingProductById = async (id) => {
    try {
        let query = `
            SELECT 
                buying.buying_id, 
                buying.buying_date, 
                buying.total, 
                buying.shipping_address, 
                buying.status AS buying_status, 
                selling.size_id, 
                selling.selling_price, 
                products.product_name, 
                products.description, 
                products.img, 
                category.category_name, 
                brands.brand_name
            FROM 
                buying
            LEFT JOIN 
                selling ON buying.selling_id = selling.selling_id
            LEFT JOIN 
                products ON selling.product_id = products.product_id
            LEFT JOIN 
                category ON products.category_id = category.category_id
            LEFT JOIN 
                brands ON products.brand_id = brands.brand_id
            WHERE 
                buying.user_id = ?;
        `;
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    createBuyingProduct,
    getBuyingProductById
} 