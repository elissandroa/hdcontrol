const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Role = require('./Role')

const User = db.define('User',
    {
        name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            required: false
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

    })
Role.hasMany(User);
User.belongsTo(Role);

module.exports = User