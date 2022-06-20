const Sequelize = require("sequelize");

const sequelize = new Sequelize("bid", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
/*
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bid', 'root', '', {
  host: 'localhost',
  dialect: mysql
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.js")(sequelize, Sequelize);

module.exports = sequelize;
/*const mysql = require('mysql');
const database= mysql.createConnection({
	host:"localhost",
  port:"3306",
	user:"root",
	password:"",
  database:"bid"

});*//*
module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "",
	DB: "bid",
	dialect: "mysql",
	pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
	}
  };*/