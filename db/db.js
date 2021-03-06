const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/bioanalytica`, {
    logging: false
});

module.exports = db;