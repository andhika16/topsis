const Sequelize = require("sequelize");

const db = new Sequelize("topsis", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
