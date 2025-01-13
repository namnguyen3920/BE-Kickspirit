const pool = require('../services/db');

const getSellingProductsById = async (id) => {
    try {
        let query = `SELECT selling.*, size.size
        FROM selling
        LEFT JOIN size ON selling.size_id = size.size_id WHERE selling.product_id = ?;`
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}


module.exports = {
    getSellingProductsById
}