
const User = require('../models/User');
const Role = require('../models/Role');


module.exports = class UserRepository {
    static async postUserRepository(user) {
        const newUser = await User.create(user);
        return newUser;
    }

    static async getUsersRepository() {
        const users = await User.findAll();
        return users;
    }

    static async getUsersRepositoryById(id) {
        const user = await User.findByPk(id);
        return user;
    }

    static async getUsersRepositoryByEmail(email) {
        const user = await User.findOne({ where: { email: email } });
        return user;
    }

    static async getUserRepositoryByName(name) {
        const user = await User.findAll({ where: { name: name } });
        return user;
    }

    static async patchUserRepository(user, id) {
        await User.update(user, { where: { id: id } });
        const userUpdated = await User.findByPk(id);
        return userUpdated;
    }

    static async deleteUserRepository(id) {
        const userExists = await User.findOne({ where: { id: id } });
        if (userExists) {
            User.destroy({ where: { id: id } });
        }
    }

}


