
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const Offer = sequelize.define("Offer", {
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
  orgName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
   mobile: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  commerNo: {
   type: Sequelize.INTEGER,
   allowNull: false,
 },
 taxNo: {
  type: Sequelize.INTEGER,
  allowNull: false,
},
   email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
   fbUrl: {
    type: Sequelize.STRING,
    allowNull:true
  },
  //المده اللازمه للبدء بالتنفيذ = 
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  ACcost: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ACtime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports=Offer;