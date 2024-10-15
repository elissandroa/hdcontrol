const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Order = require('./Order');
const OrderProduct = require('./OrderProduct');


const Product = db.define('Product', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})


Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'idProduct',
})

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'idOrder',
})

module.exports = Product;
