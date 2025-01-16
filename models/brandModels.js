const pool = require('../services/db');

const getBrandList = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM brands');
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getBrandList,
} 