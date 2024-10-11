const { DataTypes} = require('sequelize') 

const db = require('../db/conn')

const User = require('./User')
const Product = require('./Product')



const Order = db.define('Order', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        required: false
    },
    dataEntrega: {
        type: DataTypes.STRING,
        allowNull: false,
        required: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    payed: {
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: false
    }
})



module.exports = Order