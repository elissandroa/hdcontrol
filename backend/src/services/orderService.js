const repository = require('../repositories/orderRepository');

module.exports = class orderService {

    static async postOrderService(order) {
        let msg = '';
        try {

            const newOrder = await repository.postOrderRepository(order);

            return newOrder;

        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async getOrders() {
        let msg = '';
        try {
            const orders = await repository.getOrdersRepository();
            return orders;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }

    }

    static async getOrder(id) {
        let msg = '';
        try {
            const order = await repository.getOrdersRepositoryById(id);
            if (order === null) {
                msg = "Pedido não encontrado!";
                return msg;
            }
            return order;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }


    }

    static async patchOrderService(order, id) {
        let msg = '';
        try {
            const updatedOrder = await repository.patchOrderRepository(order, id);
            return updatedOrder;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async deleteOrderService(id) {
        try {
            repository.deleteOrderRepository(id);
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

}