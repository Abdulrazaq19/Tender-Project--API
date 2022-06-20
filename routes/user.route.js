const express = require('express');
const app = express(); 
const userRoutes = express.Router();
const mysql = require('mysql');
   const sequelize = require("../DB");
   const Sequelize = require("sequelize");
   const Op = require("sequelize").Op;
const User = require("../models/User.js");
const Offer = require("../models/offer.js");
const jwt = require('jsonwebtoken') 
const nodemailer = require("nodemailer");

//send Email by default  Gmail SMTP transport
async function sendMail(user,bidId) {
 
/*
  let mailOptions = {
    from: "khartoumbid@gmail.com", // sender address
    to: "3n3abdo@gmail.com", // list of receivers
    subject: "عطاء جديد", // Subject line
    html: `<h1>Hi</h1><br>
        <h4>تم اضافه عطاء جديد يمكن الاطلاع عليه عبر الرابط 
        http://localhost:4200/bid/{bidId}</h4>`,
  };*/
  // send mail with defined transport object
  
}
userRoutes.get('/send/:id', (req, res, next) => {
 
  const bidId = req.params.id;
   User.findAll({
    attributes: { exclude: ["Password"] },
  }).then((data) => {
  const user=  data;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "khartoumbid@gmail.com",
      pass: "0119766076",
    }

  });

  for (let index = 0; index < user.length; index++) {
    const element = user[index].email;
    console.log("تم ارسال الرساله الي الايميل : "+element+" بنجاح ")
    let info =  transporter.sendMail({
      from: "khartoumbid@gmail.com", // sender address
      to: element, // list of receivers
      subject: "عطاء جديد", // Subject line
      html: `<h1>Hi</h1><br>
        <h4>تم اضافه عطاء جديد يمكن الاطلاع عليه عبر الرابط 
        http://localhost:4200/bid/${bidId}</h4>`,
    });
  }
  }); /**/

});
userRoutes.post('/register', (req, res, next) => {
  if(!req.body.username || !req.body.Password) {
    res.json({ message: 'Please provide a username and a password.' });
} else
{
    sequelize.sync().then(function() {
      let username= req.body.username;
      let email= req.body.email;
      let Password= req.body.Password;
      return User.create({ username:req.body.username,email:req.body.email,Password:req.body.Password,name:req.body.name,orgName:req.body.orgName,EstablishDate:req.body.EstablishDate,address:req.body.address, job:req.body.job,mobile:req.body.mobile,CommLicenseNo:req.body.CommLicenseNo,taxFileNo:req.body.taxFileNo,
      })      
      .then(user => {
        
        let payload = {subject: user.username}
        let token = jwt.sign(payload, 'secretKey')
           res.status(201).json({ token });
         
       });
    }).catch(function(error) {
      console.log(error);
      res.status(403).json({ message: 'Username already exists!' });
  });;
}

});
userRoutes.post('/login', (req, res, next) => {

        let username=req.body.username;
        let password=req.body.Password;
        const where = {
          username: req.body.username,
          Password:password
       
        }
         User.findOne({
          where: where
        })
        .then((user) => {
          let errors = [];

          if (req.body) {
              if (!req.body.username) {
                  errors.push('Missing username field');
              }
              if (!req.body.Password) {
                  errors.push('Missing password field');
              }
  
              if (errors.length) {
                  return res.status(400).send({errors: errors.join(',')});
              }
               if (user) {
             if (user.id==1)
              {
                 let payload = {subject: user.username}
               let token = jwt.sign(payload, 'secretKey')
     res.json({ username: user.username,token:token });
              }
             else {
                let payload = {subject: user.username}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
              }
          }
          else if(!user)
          {
            
            let payload = {subject: username}
      res.json({ payload });
          }
        }
        })
        
   
  });
userRoutes.get('/', function(req, res, next) {
  
  User.findAll({
   attributes:{ exclude:['Password']}
  })
  .then(data => {
    
    res.json(data);
  })
  });
  
  userRoutes.get('/:id', (req, res, next) => { 
    
    const where = {
     id: req.params.id

 }
  User.findOne({
   where: where ,
   include:Offer,
   attributes:{exclude:['Password']}
 }).then(data => {
   res.json(data);
 })
})

// Defined delete data(index ) route
userRoutes.delete('/del/:id', function(req, res, next) {
  const id = req.params.id;
  
  User.destroy({  where: { id: id } })
 
    .then(updatedPet => {
      res.json(updatedPet);
    });
})
  //await User.sum('age'); // 55
  module.exports=userRoutes;
   
//            User.comparePassword(password, user.password, function(error, isMatch)
             /*const amount = Project.count({
      where: {
        id: {
          [Op.gt]: 1
        }
      }
    });*/