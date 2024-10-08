const repository = require('../repositories/roleRepository');


module.exports = class RoleService {

    static async postRoleService(role) {
        repository.postRoleRepository(role)
    }
}


