
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const Complaint = sequelize.define("Complaint", {
  describtion: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
});

module.exports =  Complaint;


