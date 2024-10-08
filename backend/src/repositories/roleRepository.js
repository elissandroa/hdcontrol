const roleData = {
    authority: "User"
}

const Role = require('../models/Role');

module.exports = class RoleRepository  {

    static async postRoleRepository(roleData) {
        const newRole = await Role.create(roleData);
        return newRole;
    }

 }

    





