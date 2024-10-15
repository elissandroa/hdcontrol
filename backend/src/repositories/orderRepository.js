const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');
const { Where } = require('sequelize/lib/utils');

module.exports = class OrderRepository {

    static async postOrderRepository(order) {
        const newOrder = await Order.create(order);
        const orderId = newOrder.id;
        order.items.map((item) => item.idOrder = orderId);
        const orderItems = order.items;

        for (let i = 0; i < orderItems.length; i++) {
            const productItem = await Product.findByPk(orderItems[i].idProduct);
            await newOrder.addProduct(productItem, { through: { quantity: orderItems[i].quantity, price: orderItems[i].price } });
        }

        return newOrder;
    }

    static async getOrdersRepository() {
        const orders = await Order.findAll({ include: Product });
        return orders;
    }

    static async getOrdersRepositoryById(id) {
        const order = await Order.findAll({ where: { id: id }, include: Product });
        return order;
    }

    static async patchOrderRepository(order, id) {

        const orderExists = await Order.findByPk(id);

        if (orderExists) {
            await Order.update(order, { where: { id: id } });
            console.log("OrderUpdated")
        } else {
            console.log("Order não encontrada")
        }

        const orderItems = await OrderProduct.findAll({ where: { idOrder: id } });

        for (let i = 0; i < order.items.length; i++) {
            const idProduct = order.items[i].idProduct;
            const idOrder = order.items[i].idOrder;


            const products = {
                quantity: order.items[i].quantity,
                price: order.items[i].price
            }

            if (orderItems[i] !== undefined) {
                await OrderProduct.update(products, { where: { idOrder: idOrder, idProduct: idProduct } });
            } else {
                const updateOrder = await Order.findByPk(id);
                const productItem = await Product.findByPk(order.items[i].idProduct);
                await updateOrder.addProduct(productItem, { through: { quantity: order.items[i].quantity, price: order.items[i].price } });
            }

        }
        let listProductsDb = [];
        let listProductReq = [];

        if (orderItems.length > order.items.length) {
            for (let i = 0; i < orderItems.length; i++) {
                listProductsDb.push(orderItems[i].dataValues.idProduct);
            }
            for (let i = 0; i < order.items.length; i++) {
                listProductReq.push(order.items[i].idProduct);
            }
            let prodToDelete = listProductsDb.filter(item => !listProductReq.includes(item));

            for (let i = 0; i < prodToDelete.length; i++) {
                OrderProduct.destroy({ where: { idOrder: id, idProduct: prodToDelete[i] } })
            }

        }

        if (orderItems.length < order.items.length) {
            for (let i = 0; i < orderItems.length; i++) {
                listProductsDb.push(orderItems[i].dataValues.idProduct);
            }
            for (let i = 0; i < order.items.length; i++) {
                listProductReq.push(order.items[i].idProduct);
            }
            let prodToAdd = listProductReq.filter(item => !listProductsDb.includes(item));
            for (let i = 0; i < prodToAdd.length; i++) {

                const updateOrder = await Order.findByPk(id);
                const productItem = await Product.findByPk(prodToAdd[i]);

                await updateOrder.addProduct(productItem, { through: { quantity: order.items[i].quantity, price: order.items[i].price } });
            }

        }
    }

    static async deleteOrderRepository(id) {
        const orderExists = await Order.findOne({ where: { id: id } });
        if (orderExists) {
            Order.destroy({ where: { id: id } });
        }
    }

}


