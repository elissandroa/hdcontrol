const service = require('../services/orderService');

module.exports = class OrderController {


    static async postOrderController(req, res) {

        const { UserId, amount, dataEntrega, status, payed, items } = req.body;

        const order = {
            UserId,
            amount,
            dataEntrega,
            status,
            payed,
            items
        }
        const newOrder = await service.postOrderService(order);
        res.status(201).json(newOrder);

    }

    static async getOrderController(req, res) {
        const orders = await service.getOrders();
        res.status(200).json(orders);
    }

    static async getOrderControllerById(req, res) {
        const id = req.params.id;
        const order = await service.getOrder(parseInt(id));
        res.status(200).json(order);
    }


    static async patchOrderController(req, res) {
        const { UserId, amount, dataEntrega, status, payed, items } = req.body;
        const id = req.params.id;
        const order = {
            UserId,
            amount,
            dataEntrega,
            status,
            payed,
            items
        }

        const updatedOrder = await service.patchOrderService(order, id);
        res.status(200).json(updatedOrder);
    }

    static async deleteOrderController(req, res) {
        const id = req.params.id;
        await service.deleteOrderService(id);
        res.status(200).json({ message: 'Deletado com sucesso!' });
    }

}