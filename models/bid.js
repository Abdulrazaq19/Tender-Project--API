
const { BOOLEAN } = require("sequelize");
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const bid = sequelize.define("bid", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  local: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  budget: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  specfication: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  bidPaper: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
 description: {
    type: Sequelize.STRING,
    allowNull: false
  },
published:{
  type:Sequelize.BOOLEAN,
  allowNull:false,
}
});

module.exports =  bid;


