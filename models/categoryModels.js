const pool = require('../services/db');

const getCategoryNameList = async () => {
    try {
        const [results] = await pool.execute('SELECT * FROM categories');
        return results;
    } catch (err) {
        throw err;
    }
}

const createCategory = async (category_name) => {
    try {
        let query = "INSERT INTO products (category_name) VALUES (?)";
        const [results] = await pool.execute(query, [category_name]);
        return {id: results.insertId, category_name};
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getCategoryNameList,
    createCategory,
}