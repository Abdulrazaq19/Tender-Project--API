
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const Contact = sequelize.define("Contact", {
 name: {
        type: Sequelize.STRING,
        allowNull: true
      }  ,
  email: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
  message: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports =  Contact;


