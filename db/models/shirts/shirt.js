const Sequelize = require('sequelize');
const db = require('../../db');

const Shirt = db.define('shirt', {
    shirtName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    imgURL: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Shirt;