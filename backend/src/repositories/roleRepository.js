const Role = require('../models/Role');


module.exports = class RoleRepository {

    static async postRoleRepository(role) {
        const newRole = await Role.create(role);
        return newRole;
    }

    static async getRolesRepository() {
        const role = await Role.findAll();
        return role;
    }

    
}


