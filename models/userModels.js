const pool = require('../services/db');

const getAllUsers = async (req, res) => {
    try {
        const [results] = await pool.execute('SELECT * FROM users');
        return results;
    } catch (err) {
        throw err;
    }
};

const getUsersById = async (id) => {
    try {
        let query = "SELECT * FROM users WHERE user_id = ?";
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

const getUsersByUsername = async (username) => {
    try {
        let query = "SELECT * FROM users WHERE username = ?";
        const [results] = await pool.execute(query, [username]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

const createUser = async (userVal) => {
    const { username, password, email, first_name, last_name } = userVal;
    try {
        let query = "INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
        const [results] = await pool.execute(query, [username, password, email, first_name, last_name]);
        return {id: results.insertId, username, email, first_name, last_name};
    }
    catch (err) {
        throw err;
    }
}

const deleteUserById = async (id) => {
    try {
        let query = "DELETE FROM users WHERE user_id = ?";
        const [results] = await pool.execute(query, [id]);
        return results;
    }
    catch (err) {
        throw err;
    }
}

const modifyUser = (id, user, callback) => {
    const updates = [];
    const values = [];

    Object.entries(user).forEach(([key, value]) => {
        if (value !== null) {
            updates.push(`${key} = ?`);
            values.push(value);
        }
    });

    if (updates.length === 0) {
        return callback(null, { message: 'No fields to update' });
    }

    values.push(id);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`;

    
    
    pool.execute(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, { id, ...user });
    });
};

module.exports = {
    getAllUsers,
    getUsersById,
    getUsersByUsername,
    createUser,
    deleteUserById,
    modifyUser
}