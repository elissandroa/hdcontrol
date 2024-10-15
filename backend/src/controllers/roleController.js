const service = require('../services/roleService');

module.exports = class RoleController {


    static async postRoleController(req, res) {
        const role = {
            authority: req.body.authority
        }


        const newRole = await service.postRoleService(role);
        res.status(201).json(newRole);

    }

    static async getRoleController(req, res) {
        const roles = await service.getRoles();
        res.status(200).json(roles);
    }

}