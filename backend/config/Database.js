require('dotenv').config(); // Load environment variables from .env file

const Sequelize = require('sequelize');

const isProduction = process.env.NODE_ENV === 'development';

const db = new Sequelize(
  isProduction ? process.env.MYSQL_DATABASE_PROD : process.env.MYSQL_DATABASE_DEV,
  isProduction ? process.env.MYSQL_USER_PROD : process.env.MYSQL_USER_DEV,
  isProduction ? process.env.MYSQL_PASSWORD_PROD : process.env.MYSQL_PASSWORD_DEV,
  {
    host: isProduction ? process.env.MYSQL_HOST_PROD : process.env.MYSQL_HOST_DEV,
    dialect: 'mysql',
  }
);
module.exports = db;
