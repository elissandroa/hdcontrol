const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();


router.get('/users/checkuser', UserController.checkUser);
router.post('/users/login', UserController.login);
router.delete('/users/:id', UserController.deleteUserController);
router.patch('/users/:id', UserController.patchUserController);
router.post('/users', UserController.postUserController);
router.get('/users/q', UserController.getUserControllerByName);
router.get('/users/:id', UserController.getUserControllerById);
router.get('/users', UserController.getUserController);




module.exports = router