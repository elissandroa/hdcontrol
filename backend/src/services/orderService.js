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
        const order = await repository.getOrdersRepositoryById(id);
        return order;
    }

    static async patchOrderService(order, id) {
        const updatedOrder = await repository.patchOrderRepository(order, id);
        return updatedOrder;
    }

    static async deleteOrderService(id) {
        const deletedOrder = repository.deleteOrderRepository(id);
        return deletedOrder;
    }

}