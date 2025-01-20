const pool = require('../services/db');

const getSize = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM size');
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getSize,
} 