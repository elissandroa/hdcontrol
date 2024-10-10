const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const Product = db.define('Product', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    brand : {
      type: DataTypes.STRING,
      allowNull: false,
      required: true  
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        required:true
    }
})


module.exports = Product;