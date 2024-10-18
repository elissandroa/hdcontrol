const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');
const User = require('../models/User');
const { Where } = require('sequelize/lib/utils');
const { where } = require('sequelize');

module.exports = class OrderRepository {

    static async postOrderRepository(order) {
        const newOrder = await Order.create(order);
        const orderId = newOrder.id;
        order.items.map((item) => item.idOrder = orderId);
        order.items.map((item) => delete item.id);
        const orderItems = order.items;

        let total = 0;
        for (let i = 0; i < order.items.length; i++) {
            total += (parseInt(order.items[i].quantity) * parseFloat(order.items[i].price));
        }
        order.amount = total;
        newOrder.update(order, { where: { id: orderId } });

        for (let i = 0; i < orderItems.length; i++) {
            const productItem = await Product.findByPk(orderItems[i].idProduct);
            await newOrder.addProduct(productItem, { through: { quantity: orderItems[i].quantity, price: orderItems[i].price, servicing: orderItems[i].servicing, notes: orderItems[i].notes } });
        }


        return newOrder;
    }

    static async getOrdersRepository() {
        const orders = await Order.findAll({ include: [Product, User] });
        return orders;
    }

    static async getOrdersRepositoryById(id) {
        const order = await Order.findOne({ where: { id: id }, include: [Product, User] });
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
            order.items[i].id = undefined;
            const idProduct = order.items[i].idProduct;
            const idOrder = order.items[i].idOrder;
            const servicing = order.items[i].servicing;
            const notes = order.items[i].notes;


            const products = {
                quantity: order.items[i].quantity,
                price: order.items[i].price,
                servicing: order.items[i].servicing,
                notes: order.items[i].notes
            }

            if (orderItems[i] !== undefined) {
                await OrderProduct.update(products, { where: { idOrder: idOrder, idProduct: idProduct } });
            } else {
                const updateOrder = await Order.findByPk(id);
                const productItem = await Product.findByPk(order.items[i].idProduct);
                await updateOrder.addProduct(productItem, { through: { quantity: order.items[i].quantity, price: order.items[i].price, servicing: order.items[i].servicing, notes: order.items[i].notes } });
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
            
            for (let i = 0; i < order.items.length; i++) {
                listProductReq.push(order.items[i].idProduct);
            }
            let prodToAdd = listProductReq.filter(item => !listProductsDb.includes(item));
            for (let i = 0; i < prodToAdd.length; i++) {

                const updateOrder = await Order.findByPk(id);
                const productItem = await Product.findByPk(prodToAdd[i]);

                await updateOrder.addProduct(productItem, { through: { quantity: order.items[i].quantity, price: order.items[i].price, servicing: order.items[i].servicing, notes: order.items[i].notes } });
            }
        }

        let total = 0;

        for (let i = 0; i < order.items.length; i++) {
            total += order.items[i].price * order.items[i].quantity;
        }

        order.amount = total;

        await Order.update(order, { where: { id: id } });
        
        return order;

    }

    static async deleteOrderRepository(id) {
        const orderExists = await Order.findOne({ where: { id: id } });
        if (orderExists) {
            Order.destroy({ where: { id: id } });
        }
    }

}


