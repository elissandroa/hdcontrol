const { DataTypes } = require('sequelize');

const db = require('../db/conn')


const Role = db.define('Role', {
    authority: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    }
})

module.exports = Role