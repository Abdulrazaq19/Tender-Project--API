
const Sequelize = require("sequelize");

const sequelize = require("../DB");

const optOffer = sequelize.define("optOffer", {
  offerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: true
  }, 
});
module.exports=optOffer;