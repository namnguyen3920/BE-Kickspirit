const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//GET USER BY ID
router.get('/:id', userController.getUsersById);

//LOGIN USER
router.post('/login', userController.getUserForLogin);

//GET ALL USERS
router.get('/', userController.getAllUsers);

//POST USER
router.post('/add-user', userController.addUsers);

//MODIFY USER
router.put('/update-user/:id', userController.modifyUser);

//DELETE USER
router.delete('/del-user/:id', userController.deleteUserById);

module.exports = router;