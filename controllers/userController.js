
const userModels = require('../models/userModels');
const userServices = require('../services/userServices');
const jwtHelper = require('../services/jwtHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;

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

exports.getUserForLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModels.getUsersByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        
        if (passwordMatch) {
            const token = jwtHelper.generateToken(user[0]);
            return res.status(200).json({
                message: 'Login successful',
                token: token,
                user: user[0],
            });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    } catch (err) {
        console.error("Error: ", err);
        console.log("Request body: ", req.body);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.addUsers = async (req, res) => {
    const { username, password, email, first_name, last_name, isAdmin } = req.body;

    try {

        const { newUser, token } = await userServices.registerUser({
            username,
            password,
            email,
            first_name,
            last_name,
            isAdmin
        });

        res.status(201).json({ message: 'User added successfully', user: newUser, token });
    } catch (err) {
        res.status(409).json({ message: err.message });
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