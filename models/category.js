
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const Category = sequelize.define("Category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 1, max: 18 }
  }, 

});

module.exports =  Category;


