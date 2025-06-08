const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vollodb', 'vollo', 'vollo123', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

module.exports = sequelize;
