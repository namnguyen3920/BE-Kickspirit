const userModels = require('../models/userModels');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModels.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching', message: err.message });
    }
}

exports.getUsersById = async (req, res) => {
    try {
        const users = await userModels.getUsersById(req.params.id);
        res.status(200).json(users);
    }
    catch (err) {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

    }
}

exports.getUsersByName = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await userModels.getUsersByName(username);
        res.status(200).json(user);
    }
    catch (err) {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

    }
}

exports.addUsers = async (req, res) => {
    const { username, password, email, first_name, last_name, isAdmin } = req.body;
    try {
        const newUser = await userModels.createUser(username, password, email, first_name, last_name, isAdmin);
        res.status(201).json({ message: 'User added', user: newUser });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteUserById = async (req, res) => {   
    try {
        const result = await userModels.deleteUserById(req.params.id);                 
        if (!result) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        res.status(400).json({ message: "Cannot delete user", error: err.message });
    }
}

exports.modifyUser = async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    try {        
        const result = await userModels.modifyUser(id, user);
        res.status(200).json({ message: "User updated" , user: result});
    } catch (err){
        res.status(400).json({ message: err.message });
    }
}