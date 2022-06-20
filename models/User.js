
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 orgName:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  EstablishDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  address:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  job: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
   username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  CommLicenseNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  taxFileNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports =  User;


