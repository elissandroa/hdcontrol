const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = require('./User')


const Order = db.define('Order', {
    amount: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    dataEntrega: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        required: false
    },
    payed: {
        type: DataTypes.BOOLEAN,
        required: true,
        allowNull: false
    },

})

Order.belongsTo(User)




module.exports = Order