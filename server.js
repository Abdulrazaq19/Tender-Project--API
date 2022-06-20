const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const nodemailer = require('nodemailer');
const complaintRoute = require('./routes/complaint.route');
const contactRoute = require('./routes/contact.route');
const noticeRoute = require('./routes/notice.route');
const bidRoute = require('./routes/bid.route');
const categoryRoute = require('./routes/category.route');
const userRoute = require('./routes/user.route');
const sequelize = require("./DB");
const Customer = require("./models/User");
const Category = require("./models/category");
const Contact = require("./models/contact");
const bid = require("./models/bid");
const complaint = require("./models/complaint");
const Notice = require("./models/notice");
const Offer = require('./models/offer');
const optOffer = require('./models/optOffer');
const offerRoutes = require('./routes/offer.route');
const indexRoute = require('./routes/index.route');
Customer.hasMany(Offer);
Category.hasMany(bid);
bid.belongsTo(Category);
bid.hasMany(Offer);
bid.hasMany(complaint);
Offer.belongsTo(bid);
bid.hasOne(optOffer);
optOffer.belongsTo(bid);
let customerId = null;
sequelize.sync({force: true}).then((result) => {
 /* const date=new Date();
    return Customer.create({name:"manger",orgName:"none",EstablishDate:date,address:"الخرطوم -ابوجنزير",job:"manger",mobile:'0120120120',taxFileNo:'undefined',CommLicenseNo:'undefined', username: "admin",email: "avf.agy@gmail.com",Password:"ad1234"})
    }).catch((err) => 
    { console.log(err);*/
  });
  app.use('/index', indexRoute);
app.use('/bid', bidRoute);
app.use('/category', categoryRoute);
app.use('/notice', noticeRoute);
app.use('/auth', userRoute);
app.use('/offer', offerRoutes);
app.use('/complaint', complaintRoute);
app.use('/contact', contactRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});
//
//await sequelize.sync({ force: true });
/* .then(customer => {
    customerId = customer.id;
    return customer.createOrder({total: 1});
  })
  .then(order => {
    console.log("role : ",order);
    return Order.findAll({ where: customerId});
  })
  .then(orders => {
    console.log("are : ",orders);
  }) */