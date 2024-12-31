const pool = require('../services/db');

const getCategoryList = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM category');
        return results;
    } catch (err) {
        throw err;
    }
};

const createCategory = async (category_name) => {
    try {
        let query = "INSERT INTO category (category_name) VALUES (?)";
        const [results] = await pool.execute(query, [category_name]);
        return {id: results.insertId, category_name};
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getCategoryList,
    createCategory,
}