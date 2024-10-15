const repository = require('../repositories/roleRepository');

module.exports = class RoleService {

    static async postRoleService(role) {
          let msg = '';
        try {
                    
            const newRole = await repository.postRoleRepository(role);

            return newRole;

        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async getRoles() {
        let msg = '';
        try {
            const roles = await repository.getRolesRepository();
            if (roles.length === 0) {
                msg = 'Não há produtos cadastrados!';
                return msg;
            }
            return roles;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }

    }
   
}