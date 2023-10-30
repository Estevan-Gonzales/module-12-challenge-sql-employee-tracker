const Sequelize = require('sequelize');

// Enable access to .env variables
require('dotenv').config();

// Use environment variables to connect to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'j21q532mu148i8ms.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
