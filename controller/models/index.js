const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize('bid', 'root', '', {
    host: 'localhost',
  dialect: mysql,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./complaint.js")(sequelize, Sequelize);

db.user = require("./User.js")(sequelize, Sequelize);

module.exports = db;
