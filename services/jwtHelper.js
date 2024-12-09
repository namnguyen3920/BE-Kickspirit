const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

exports.generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};