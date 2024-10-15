const { DataTypes } = require('sequelize');
const db = require('../db/conn');


const OrderProduct = db.define('OrderProduct', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        required: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    }
})

module.exports = OrderProduct;