const repository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

module.exports = class UserService {

    static async postUserService(user) {
        let msg = '';
        try {
            const email = user.email;
            const nomeEmpty = user.name.length;
            const phoneEmpty = user.phone.length;
            const password = user.password

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;

            const userExist = await repository.getUsersRepositoryByEmail(email);
            if (userExist) {
                msg = { message: 'Email já cadastrado!' };
                return msg;
            }

            if (!nomeEmpty) {
                msg = { message: 'O campo nome é obrigatório' };
                return msg;
            }

            if (!phoneEmpty) {
                msg = { message: 'O campo telefone é obritatório' };
                return msg;
            }

            const newUser = await repository.postUserRepository(user);

            newUser.password = undefined;
            return newUser;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async getUsers() {
        let msg = '';
        try {
            const users = await repository.getUsersRepository();
            if (users.length === 0) {
                msg = 'Não há usuários cadastrados!';
                return msg;
            }
            users.map((user) => user.password = undefined);
            return users;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }

    }

    static async getUser(id) {
        let msg = '';
        try {
            const user = await repository.getUsersRepositoryById(id);
            if (user === null) {
                msg = "Usuario não encontrado!";
                return msg;
            }
            user.password = undefined;
            return user;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }


    }

    static async getUserServiceByName(name) {
        let msg = '';
        try {
            const users = await repository.getUserRepositoryByName(name);
            users.map((user) => user.password = undefined);
            return users;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async patchServiceUser(user, id) {
        let msg = '';
        try {
            const password = user.password;

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;

            const updatedUser = await repository.patchUserRepository(user, id);
            updatedUser.password = undefined;
            return updatedUser;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async deleteServiceUser(id) {
        try {
            repository.deleteUserRepository(id);
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }


    static async loginService(req, res) {

        try {
            const { email, password } = req.body;

        const user = await repository.getUsersRepositoryByEmail(email);

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                res.status(422).json({ message: 'Acesso negado!' })
                return;
            }
        }
        const loggedUser = await createUserToken(user, req, res);

        return { loggedUser };
        } catch (error) {
            console.log(error);
        }

    }

    static async checkUserService(req, res) {
        let currentUser;

        try {
            if (req.headers.authorization) {
                const token = getToken(req);
                const decoded = await jwt.verify(token, process.env.JWT_SECRET);
                currentUser = await repository.getUsersRepositoryById(decoded.id);
                currentUser.password = undefined;
            }
                
        } catch (error) {
            currentUser = null;
        }

        res.status(200).json(currentUser);
    }
}