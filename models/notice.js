
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const Notice = sequelize.define("Notice", {
 
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 1, max: 18 }
  }, 
  describtion: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
});

module.exports =  Notice;


