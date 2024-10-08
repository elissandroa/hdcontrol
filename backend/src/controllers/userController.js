const service = require('../services/userService');
const Role = require('../models/Role');


module.exports = class UserController {


    static async postUserController(req, res) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            RoleId: req.body.RoleId
        }

        const newUser = await service.postUserService(user);
        res.status(201).json(newUser);
    }

    static async getUserController(req, res) {
        const users = await service.getUsers();
        res.status(200).json(users);
    }

    static async getUserControllerById(req, res){
        const id = req.params.id;
        const user = await service.getUser(parseInt(id));
        res.status(200).json(user);
    }

    static async getUserControllerByName(req, res){
        const {name } = req.query;
        const user = await service.getUserServiceByName(name);
        res.status(200).json(user);
    }

    static async patchUserController(req, res) {
        const {name, email, phone, password, RoleId} = req.body;
        const id = req.params.id;
        const user = {
            name,
            email,
            phone,
            password,
            RoleId
        }

        const updatedUser = await service.patchServiceUser(user, id);
        res.status(200).json(updatedUser);
    }

    static async deleteUserController(req, res) {
        const id = req.params.id;
        await service.deleteServiceUser(id);
        res.status(200).json({message: 'Deletado com sucesso!'});
    }


}