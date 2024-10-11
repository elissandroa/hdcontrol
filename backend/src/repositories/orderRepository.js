const Order = require('../models/Order');


module.exports = class OrderRepository {

    static async postProdutRepository(order) {
        const newOrder = await Order.create(product);
        return newOrder;
    }

    static async getOrdersRepository() {
        const orders = await Order.findAll();
        return orders;
    }

    static async getOrdersRepositoryById(id) {
        const order = await Order.findByPk(id);
        return order;
    }

    static async patchOrderRepository(order, id) {
        await Order.update(order, { where: { id: id } });
        const orderUpdated = await Order.findByPk(id);
        return orderUpdated;
    }

    static async deleteOrderRepository(id) {
        const orderExists = await Order.findOne({ where: { id: id } });
        if (orderExists) {
            Order.destroy({ where: { id: id } });
        }
    }

}


