const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://postgres@localhost:5432/bioanalytica", {
    logging: false
});

module.exports = db;