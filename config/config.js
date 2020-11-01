const Sequelize = require('sequelize');

// create connection to our db
const sequelize = process.env.JAWSDB_URL
// ? (condition) if true do this
  ? new Sequelize(process.env.JAWSDB_URL)
  // : else, do such
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });

module.exports = sequelize;
