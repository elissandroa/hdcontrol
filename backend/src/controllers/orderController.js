const service = require('../services/orderService');

module.exports = class OrderController {


    static async postOrderController(req, res) {

        const { UserId, amount, dataEntrega, status, payed, notes, items } = req.body;

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
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(422).json({ message: "Ordem não encontrada!" })
        }

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

        if (order) {
            const updatedOrder = await service.patchOrderService(order, id);
            res.status(200).json(updatedOrder);
        } else {
            res.status(422).json({ message: "Ordem não encontrada !" });
        }


    }

    static async deleteOrderController(req, res) {
        const id = req.params.id;
        const deletedOrder = await service.deleteOrderService(id);
        if (deletedOrder) {
            res.status(200).json({ message: 'Deletado com sucesso!' });
        } else {
            res.status(422).json({ message: "Ordem não encontrada !" })
        }
    }
}