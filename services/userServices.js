const bcrypt = require('bcrypt');
const jwtHelper = require('../services/jwtHelper');
const userModels = require('../models/userModels');
const saltRounds = 10;

exports.registerUser = async ({ username, password, email, first_name, last_name }) => {
    
    const existingUser = await userModels.getUsersByEmail(email);
    if (existingUser) {
        throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModels.createUser({
        username,
        password: hashedPassword,
        email,
        first_name,
        last_name,
    });
    
    const token = jwtHelper.generateToken({ id: newUser.id, username: newUser.username });

    return { user: newUser, token };
};
